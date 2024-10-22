
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Passport} from "../../../../auth/passport.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {PassportEditor} from "../../common/passport-editor/view.js"

export const CreatePage = shadowView(use => (situation: Situation.Create) => {
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

		<section>
			<p>After you've created a passport, you should export it to your computer as a backup.</p>
		</section>

		<footer class=buttonbar>
			<button @click="${situation.onCancel}">Cancel</button>
			<button class=happy ?disabled="${!passport.value}" @click="${save}">Create Passport</button>
		</footer>
	`
})

