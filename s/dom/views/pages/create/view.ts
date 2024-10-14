
import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../../nexus.js"
import {Identity} from "../../../../auth/types.js"
import {Situation} from "../../../logic/situation.js"
import {IdentityEditor} from "../../common/identity-editor/view.js"

export const CreateView = nexus.shadowView(use => (situation: Situation.Create) => {
	use.styles(styles)

	const identity = use.signal<Identity | null>(situation.identity)

	function save() {
		if (identity.value)
			situation.onComplete(identity.value)
	}

	return html`
		${IdentityEditor([{
			identity: situation.identity,
			onUpdate: updated => identity.value = updated,
		}])}

		<footer class=buttonbar>
			<button @click="${situation.onCancel}">Cancel</button>
			<button class=happy ?disabled="${!identity.value}" @click="${save}">Create Identity</button>
		</footer>
	`
})

