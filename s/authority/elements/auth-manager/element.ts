
import {html} from "lit"
import {ev, nap} from "@e280/stz"
import {view, loot} from "@e280/sly"

import stylesCss from "./styles.css.js"
import themeCss from "../../theme.css.js"

import {manager} from "../../context.js"
import {Situation} from "../../logic/situation.js"
import {loader} from "../../../common/utils/loader.js"
import {EditPage} from "../../views/pages/edit/view.js"
import {ListPage} from "../../views/pages/list/view.js"
import {Intake} from "../../views/pages/ingress/intake.js"
import {CreatePage} from "../../views/pages/create/view.js"
import {DeletePage} from "../../views/pages/delete/view.js"
import {IngressPage} from "../../views/pages/ingress/view.js"
import {generateIdentity, Identity, seedPack} from "../../../trust/exports/authority.js"

export const AuthManager = view.component(use => {
	use.styles([themeCss, stylesCss])
	const {depot, storagePersistence, situationOp} = manager

	use.once(() => storagePersistence.check())

	const {drops, intake} = use.once(() => {
		const intake = new Intake()
		const drops = new loot.Drops({
			predicate: event => loot.hasFiles(event),
			acceptDrop: async event => {
				const files = loot.files(event)
				await gotoIngress(files)
			},
		})
		ev(document.documentElement, {
			dragover: drops.dragover,
			dragleave: drops.dragleave,
			drop: drops.drop,
			blur: () => drops.$indicator(false),
		})
		return {drops, intake}
	})

	async function resetScroll() {
		await nap(0)
		window.scrollTo({
			top: 0,
			behavior: "instant",
		})
	}

	async function gotoHome() {
		const identities = await depot.identities.list()
		if (identities.length === 0) await gotoCreate()
		else await gotoList()
		await resetScroll()
	}

	async function gotoCreate() {
		await situationOp.load(async() => {
			const identities = await depot.identities.list()
			const initialIdentity = await generateIdentity()
			const initialIdentitySeed = await seedPack(initialIdentity)
			const onboardingMode = identities.length === 0
			return {
				kind: "create",
				identities,
				initialIdentity,
				initialIdentitySeed,
				onIngress: () => gotoIngress(),
				onSave: async identity => {
					await depot.identities.save(identity)
					await storagePersistence.request()
				},
				onDone: gotoHome,
				onBack: onboardingMode
					? undefined
					: gotoHome,
			}
		})
		await resetScroll()
	}

	async function gotoList() {
		await depot.identities.list()
		await situationOp.load(async() => ({
			kind: "list",
			onEdit: gotoEdit,
			onCreate: gotoCreate,
			onDelete: gotoDelete,
			onIngress: () => gotoIngress(),
			onEgress: async() => {},
		}))
		await resetScroll()
	}

	async function gotoEdit(identity: Identity) {
		const seed = await seedPack(identity)
		await situationOp.load(async() => ({
			kind: "edit",
			seed,
			identity: identity,
			onBack: gotoHome,
			onDelete: async identity => {
				await depot.identities.delete(identity.id)
				await storagePersistence.request()
			},
			onSave: async identity => {
				await depot.identities.save(identity)
				await storagePersistence.request()
			},
		}))
		await resetScroll()
	}

	async function gotoDelete(identity: Identity[]) {
		await situationOp.load(async() => ({
			kind: "delete",
			identities: identity,
			onBack: gotoHome,
			onDelete: async ids => {
				await depot.identities.delete(...ids)
				await storagePersistence.request()
			},
		}))
		await resetScroll()
	}

	async function gotoIngress(files?: File[]) {
		intake.tabby.goto(0) // upload tab
		intake.clear()
		if (files)
			await intake.ingestFiles(files)
		await situationOp.load(async() => ({
			kind: "ingress",
			intake,
			onBack: gotoHome,
			onSave: async identities => {
				await depot.identities.save(...identities)
				await storagePersistence.request()
			},
		}))
		await resetScroll()
	}

	use.once(gotoHome)

	const choosePage = (situation: Situation.Any) => {
		switch (situation.kind) {
			case "list":
				return ListPage(situation)

			case "create":
				return CreatePage(situation)

			case "edit":
				return EditPage(situation)

			case "ingress":
				return IngressPage(situation)

			case "delete":
				return DeletePage(situation)

			default:
				throw new Error("unknown situation")
		}
	}

	return loader(situationOp, situation => html`
		<section class=zone ?x-drop-indicator="${drops.$indicator()}">
			${choosePage(situation)}
		<section>
	`)
})

