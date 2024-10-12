
import {loading} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Situation} from "../../situation.js"
import {Authcore} from "../../../auth/core.js"
import {Identity} from "../../../auth/types.js"
import {ListView} from "../../views/list/view.js"
import {CreateView} from "../../views/create/view.js"
import {DeleteView} from "../../views/delete/view.js"
import {syllabicName} from "../../../tools/random-names.js"

export const AuthApp = nexus.shadowComponent(use => {
	use.styles(styles)

	const authcore = use.once(() => new Authcore())
	const situationOp = use.op<Situation.Any>()

	function gotoList() {
		situationOp.load(async() => ({
			kind: "list",
			authcore,
			onCreate: gotoCreate,
			onDelete: gotoDelete,
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
		case "list": return ListView([situation])
		case "create": return CreateView([situation])
		case "delete": return DeleteView([situation])
		default: throw new Error("unknown situation")
	}})
})

