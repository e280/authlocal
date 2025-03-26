
import {deep, html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {whence} from "../../../../tools/whence.js"
import themeCss from "../../../../common/theme.css.js"
import {inputString} from "../../../../tools/input-string.js"
import {renderThumbprint} from "../../../../common/views/id/render-thumbprint.js"
import { Passport } from "../../../../auth/concepts.js"
import { maxLabelLength, validLabel } from "../../../logic/passports/utils/validation.js"

export const PassportEditor = shadowView(use => ({passport, onUpdate}: {
		passport: Passport
		onUpdate: (passport: Passport | null) => void
	}) => {

	use.name("passport-editor")
	use.styles([themeCss, stylesCss])

	const label = use.signal(passport.label)
	const valid = use.signal(true)

	function validate() {
		valid.value = validLabel(label.value)
		if (valid.value) {
			const draft = deep.clone(passport)
			draft.label = label.value
			onUpdate(draft)
		}
		else {
			onUpdate(null)
		}
	}

	function updateName(n: string) {
		label.value = n
		validate()
	}

	return html`
		<section class=form>
			<label>
				<strong>Public Name</strong>

				<input
					type=text
					.value="${label.value}"
					maxlength="${maxLabelLength}"
					@input="${inputString(updateName)}"
					?data-angry="${!validName(label.value)}"
					/>

				<small class=details>
					<span>${whence(passport.created)}</span>
					<span>${renderThumbprint(passport.thumbprint)}</span>
				</small>

				${!validName(label.value) ? html`
					<span class=invalid>invalid name</span>
				` : null}

			</label>

		</section>
	`
})

