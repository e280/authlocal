
import {html, loading} from "@benev/slate"

import {nexus} from "../../nexus.js"
import stylesCss from "./styles.css.js"
import {Situation} from "../../logic/situation.js"
import {EgressPage} from "../pages/egress/view.js"
import {svgSlate} from "../../../tools/svg-slate.js"
import {IngressPage} from "../pages/ingress/view.js"
import {ListPage} from "../../views/pages/list/view.js"
import {EditPage} from "../../views/pages/edit/view.js"
import {Identity} from "../../../common/auth/identity.js"
import {CreatePage} from "../../views/pages/create/view.js"
import {DeletePage} from "../../views/pages/delete/view.js"
import {determinePurpose} from "../../logic/determine-purpose.js"

import shieldOffIcon from "../../../common/icons/tabler/shield-off.icon.js"
import shieldCheckFilledIcon from "../../../common/icons/tabler/shield-check-filled.icon.js"
import { Identities } from "../../../common/auth/identities.js"

export const AuthManager = nexus.shadowComponent(use => {
	use.styles(stylesCss)

	const {authcore, storagePersistence} = use.context
	const purpose = use.once(determinePurpose)
	const situationOp = use.op<Situation.Any>()
	use.once(() => storagePersistence.check())

	function gotoList() {
		situationOp.load(async() => ({
			kind: "list",
			authcore,
			onEdit: gotoEdit,
			onCreate: gotoCreate,
			onEgress: identities => gotoEgress(identities, gotoList),
			onIngress: () => gotoIngress(undefined, gotoList),
		}))
	}

	async function gotoCreate() {
		const identity = await Identity.generate()
		situationOp.load(async() => ({
			kind: "create",
			identity,
			onCancel: gotoList,
			onComplete: identity => {
				authcore.add(identity)
				storagePersistence.request()
				gotoList()
			},
		}))
	}

	function gotoEdit(identity: Identity) {
		situationOp.load(async() => ({
			kind: "edit",
			identity,
			onCancel: gotoList,
			onDelete: gotoDelete,
			onComplete: identity => {
				authcore.add(identity)
				storagePersistence.request()
				gotoList()
			},
		}))
	}

	function gotoDelete(identity: Identity) {
		situationOp.load(async() => ({
			kind: "delete",
			identity,
			onCancel: gotoList,
			onComplete: identity => {
				authcore.delete(identity)
				storagePersistence.request()
				gotoList()
			},
		}))
	}

	function gotoEgress(identities: Identity[], onBack: () => void) {
		situationOp.load(async() => ({
			kind: "egress",
			identities,
			onBack,
		}))
	}

	function gotoIngress(identities: Identities | undefined, onBack: () => void) {
		situationOp.load(async() => ({
			kind: "ingress",
			identities,
			onBack,
			onAddIdentities: identities => authcore.add(...identities),
		}))
	}
	use.once(gotoList)

	const page = loading.braille(situationOp, situation => {switch (situation.kind) {

		case "list":
			return ListPage([situation, purpose])

		case "create":
			return CreatePage([situation])

		case "edit":
			return EditPage([situation])

		case "delete":
			return DeletePage([situation])

		case "egress":
			return EgressPage([situation])

		case "ingress":
			return IngressPage([situation])

		default:
			throw new Error("unknown situation")
	}})

	return html`
		${page}

		<footer>
			${storagePersistence.persisted.value ? html`
				<div class=persistence data-is-persisted>
					${svgSlate(shieldCheckFilledIcon)}
					<span>Browser storage persistence enabled</span>
				</div>
			` : html`
				<button class=persistence @click="${() => storagePersistence.request()}">
					${svgSlate(shieldOffIcon)}
					<span>Browser storage persistence disabled</span>
				</button>
			`}
		</footer>
	`
})

