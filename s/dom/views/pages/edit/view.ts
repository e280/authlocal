
import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../../nexus.js"
import {Identity} from "../../../../auth/types.js"
import {Situation} from "../../../logic/situation.js"
import {IdentityEditor} from "../../common/identity-editor/view.js"

export const EditView = nexus.shadowView(use => (situation: Situation.Edit) => {
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
			<button class=angry @click="${() => situation.onDelete(situation.identity)}">
				Delete
			</button>

			<button @click="${() => situation.onCancel()}">
				Cancel
			</button>

			<button class=happy ?disabled="${!identity.value}" @click="${save}">
				Save Changes
			</button>
		</footer>
	`
})

