
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Passport} from "../../../../auth/identity.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {PassportEditor} from "../../common/identity-editor/view.js"

export const EditPage = shadowView(use => (situation: Situation.Edit) => {
	use.styles([themeCss, stylesCss])

	const passport = use.signal<Passport | null>(situation.passport)

	function save() {
		if (passport.value)
			situation.onComplete(passport.value)
	}

	return html`
		${PassportEditor([{
			passport: situation.passport,
			onUpdate: updated => passport.value = updated,
		}])}

		<footer class=buttonbar>
			<button class=angry @click="${() => situation.onDelete(situation.passport)}">
				Delete
			</button>

			<button @click="${() => situation.onCancel()}">
				Cancel
			</button>

			<button class=happy ?disabled="${!passport.value}" @click="${save}">
				Save Changes
			</button>
		</footer>
	`
})

