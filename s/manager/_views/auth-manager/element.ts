
import {shadowComponent, loading} from "@benev/slate"

import {manager} from "../../context.js"
// import {Passport} from "../../../auth/passport.js"
// import {EgressPage} from "../pages/egress/view.js"
// import {IngressPage} from "../pages/ingress/view.js"
// import {OnboardPage} from "../pages/onboard/view.js"
import {ListPage} from "../pages/list/view.js"
// import {EditPage} from "../../views/pages/edit/view.js"
// import {CreatePage} from "../../views/pages/create/view.js"
// import {DeletePage} from "../../views/pages/delete/view.js"
// import {PassportsFile} from "../../../auth/passports-file.js"

import stylesCss from "./styles.css.js"
import themeCss from "../../../common/theme.css.js"

export const AuthManager = shadowComponent(use => {
	use.styles([themeCss, stylesCss])
	const {passportStore, storagePersistence, situationOp} = manager

	use.once(() => storagePersistence.check())

	function gotoHome() {
		if (passportStore.list().length === 0)
			gotoOnboard()
		else
			gotoList()
	}

	async function gotoOnboard() {
		const passport = await Passport.generate()
		situationOp.load(async() => ({
			kind: "onboard",
			passport,
			onDone: gotoHome,
			onIngress: () => {},
			// onIngress: () => gotoIngress(undefined, gotoHome),
			onSaveNewPassport: passport => {
				passportStore.add(passport)
				storagePersistence.request()
			},
		}))
	}

	function gotoList() {
		situationOp.load(async() => ({
			kind: "list",
			passportStore,
			onEdit: () => {},
			onCreate: () => {},
			onEgress: () => {},
			onIngress: () => {},
			// onEdit: gotoEdit,
			// onCreate: gotoCreate,
			// onEgress: passports => gotoEgress(passports, gotoHome),
			// onIngress: () => gotoIngress(undefined, gotoHome),
		}))
	}

	// async function gotoCreate() {
	// 	const passport = await Passport.generate()
	// 	situationOp.load(async() => ({
	// 		kind: "create",
	// 		passport,
	// 		onCancel: gotoHome,
	// 		onComplete: passport => {
	// 			passportStore.add(passport)
	// 			storagePersistence.request()
	// 			gotoHome()
	// 		},
	// 	}))
	// }
	//
	// function gotoEdit(passport: Passport) {
	// 	situationOp.load(async() => ({
	// 		kind: "edit",
	// 		passport,
	// 		onCancel: gotoHome,
	// 		onDelete: gotoDelete,
	// 		onComplete: passport => {
	// 			passportStore.add(passport)
	// 			storagePersistence.request()
	// 			gotoHome()
	// 		},
	// 	}))
	// }
	//
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

		// case "onboard":
		// 	return OnboardPage([situation])
		//
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

