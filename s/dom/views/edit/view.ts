
import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Situation} from "../../logic/situation.js"
import {validName} from "../../../auth/utils/validation.js"
import {renderEditableName} from "../create/parts/render-editable-name.js"

export const EditView = nexus.shadowView(use => (situation: Situation.Edit) => {
	use.styles(styles)

	const {identity} = situation
	const name = use.signal(identity.name)

	function isValid() {
		const n = name.value
		return (
			n !== identity.name &&
			validName(name.value)
		)
	}

	const valid = use.computed(isValid)

	function save() {
		if (isValid()) {
			identity.name = name.value
			situation.onComplete(identity)
		}
	}

	return html`
		<section class=form>
			${renderEditableName(identity, name)}
		</section>

		<footer>
			<button class=angry @click="${() => situation.onDelete(identity)}">
				Delete
			</button>

			<button @click="${() => situation.onCancel()}">
				Cancel
			</button>

			<button class=happy ?disabled="${!valid.value}" @click="${save}">
				Save Changes
			</button>
		</footer>
	`
})

