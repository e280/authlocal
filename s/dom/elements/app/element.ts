
import {loading} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Authcore} from "../../../auth/core.js"
import {Identity} from "../../../auth/types.js"
import {ListView} from "../../views/list/view.js"
import {EditView} from "../../views/edit/view.js"
import {Situation} from "../../logic/situation.js"
import {CreateView} from "../../views/create/view.js"
import {DeleteView} from "../../views/delete/view.js"
import {syllabicName} from "../../../tools/random-names.js"
import {determinePurpose} from "../../logic/determine-purpose.js"

export const AuthApp = nexus.shadowComponent(use => {
	use.styles(styles)

	const purpose = use.once(determinePurpose)
	const authcore = use.once(() => new Authcore())
	const situationOp = use.op<Situation.Any>()

	function gotoList() {
		situationOp.load(async() => ({
			kind: "list",
			authcore,
			onEdit: gotoEdit,
			onCreate: gotoCreate,
		}))
	}

	async function gotoCreate() {
		const name = syllabicName()
		const identity = await Authcore.generateIdentity(name)
		situationOp.load(async() => ({
			kind: "create",
			identity,
			onCancel: gotoList,
			onComplete: identity => {
				authcore.add(identity)
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
				gotoList()
			},
		}))
	}

	use.once(gotoList)

	return loading.braille(situationOp, situation => {switch (situation.kind) {

		case "list":
			return ListView([situation, purpose])

		case "create":
			return CreateView([situation])

		case "edit":
			return EditView([situation])

		case "delete":
			return DeleteView([situation])

		default: throw new Error("unknown situation")
	}})
})

