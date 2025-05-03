
import {shadowComponent, loading, nap} from "@benev/slate"

import {manager} from "../../context.js"
import {EditPage} from "../pages/edit/view.js"
import {ListPage} from "../pages/list/view.js"
import {CreatePage} from "../pages/create/view.js"
import {dehydratePassports, generatePassport, Passport} from "../../../core/passport.js"
// import {Passport} from "../../../auth/passport.js"
// import {EgressPage} from "../pages/egress/view.js"
// import {IngressPage} from "../pages/ingress/view.js"
// import {OnboardPage} from "../pages/onboard/view.js"
// import {EditPage} from "../../views/pages/edit/view.js"
// import {DeletePage} from "../../views/pages/delete/view.js"
// import {PassportsFile} from "../../../auth/passports-file.js"

import stylesCss from "./styles.css.js"
import themeCss from "../../../common/theme.css.js"

export const AuthManager = shadowComponent(use => {
	use.styles([themeCss, stylesCss])
	const {depot, storagePersistence, situationOp} = manager

	use.once(() => storagePersistence.check())

	async function resetScroll() {
		await nap(0)
		window.scrollTo({
			top: 0,
			behavior: "instant",
		})
	}

	async function gotoHome() {
		const passports = await depot.passports.list()
		if (passports.length === 0) await gotoCreate()
		else await gotoList()
		await resetScroll()
	}

	async function gotoCreate() {
		await situationOp.load(async() => {
			const passports = await depot.passports.list()
			const initialPassport = await generatePassport()
			const initialPassportSeed = await dehydratePassports([initialPassport])
			const onboardingMode = passports.length === 0
			return {
				kind: "create",
				passports,
				initialPassport,
				initialPassportSeed,
				onIngress: async() => {},
				onSave: async passport => {
					await depot.passports.save(passport)
					storagePersistence.request()
				},
				onDone: gotoHome,
				onCancel: onboardingMode
					? undefined
					: gotoHome,
			}
		})
		await resetScroll()
	}

	async function gotoList() {
		const passports = await depot.passports.list()
		const passportInfo = await Promise.all(passports.map(async passport => ({
			passport,
			seed: await dehydratePassports([passport]),
		})))
		await situationOp.load(async() => ({
			kind: "list",
			passportInfo,
			onEdit: gotoEdit,
			onCreate: gotoCreate,
			onEgress: async() => {},
			onIngress: async() => {},
			// onCreate: gotoCreate,
			// onEgress: passports => gotoEgress(passports, gotoHome),
			// onIngress: () => gotoIngress(undefined, gotoHome),
		}))
		await resetScroll()
	}

	async function gotoEdit(passport: Passport) {
		const seed = await dehydratePassports([passport])
		await situationOp.load(async() => ({
			kind: "edit",
			seed,
			passport,
			onBack: gotoHome,
			onDelete: async passport => {
				await depot.passports.delete(passport.id)
			},
			onSave: async passport => {
				await depot.passports.save(passport)
				storagePersistence.request()
			},
		}))
		await resetScroll()
	}

	// function gotoDelete(passport: Passport) {
	// 	situationOp.load(async() => ({
	// 		kind: "delete",
	// 		passport,
	// 		onCancel: gotoHome,
	// 		onComplete: passport => {
	// 			passportStore.delete(passport)
	// 			storagePersistence.request()
	// 			gotoHome()
	// 		},
	// 	}))
	// }
	//
	// function gotoEgress(passports: Passport[], onBack: () => void) {
	// 	situationOp.load(async() => ({
	// 		kind: "egress",
	// 		passports,
	// 		onBack,
	// 	}))
	// }
	//
	// function gotoIngress(passports: PassportsFile | undefined, onBack: () => void) {
	// 	situationOp.load(async() => ({
	// 		kind: "ingress",
	// 		passports,
	// 		onBack,
	// 		onAddPassports: passports => passportStore.add(...passports),
	// 	}))
	// }

	use.once(gotoHome)

	const page = loading.braille(situationOp, situation => {switch (situation.kind) {
		case "list":
			return ListPage([situation])

		case "create":
			return CreatePage([situation])

		case "edit":
			return EditPage([situation])

		// case "create":
		// 	return CreatePage([situation])
		//
		// case "edit":
		// 	return EditPage([situation])
		//
		// case "delete":
		// 	return DeletePage([situation])
		//
		// case "egress":
		// 	return EgressPage([situation])
		//
		// case "ingress":
		// 	return IngressPage([situation])

		default:
			throw new Error("unknown situation")
	}})

	return page
})

