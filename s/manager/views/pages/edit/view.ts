
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {theme} from "../../../../common/theme.js"
import {Situation} from "../../../logic/situation.js"
import {Identity} from "../../../../common/auth/identity.js"
import {IdentityEditor} from "../../common/identity-editor/view.js"

export const EditPage = shadowView(use => (situation: Situation.Edit) => {
	use.styles([theme, stylesCss])

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

