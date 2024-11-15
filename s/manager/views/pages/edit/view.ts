
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Passport} from "../../../../auth/passport.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {PassportEditor} from "../../common/passport-editor/view.js"

export const EditPage = shadowView(use => (situation: Situation.Edit) => {
	use.styles([themeCss, stylesCss])

	const passport = use.signal<Passport | null>(situation.passport)

	function save() {
		if (passport.value)
			situation.onComplete(passport.value)
	}

	function select(event: PointerEvent) {
		const target = event.currentTarget as HTMLInputElement
		target.select()
	}

	return html`
		${PassportEditor([{
			passport: situation.passport,
			onUpdate: updated => passport.value = updated,
		}])}

		${passport.value && html`
			<input
				type=text
				readonly
				.value="${passport.value.thumbprint}"
				@click="${select}"
				/>
		`}

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

