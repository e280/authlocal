
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {PassportDraft} from "./draft.js"
import themeCss from "../../../../common/theme.css.js"
import {inputString} from "../../../../tools/input-string.js"
import {renderThumbprint} from "../../../../common/views/id/render-thumbprint.js"
import {maxLabelLength, validLabel} from "../../../logic/passports/utils/validation.js"

export const PassportEditor = shadowView(use => (draft: PassportDraft) => {
	use.name("passport-editor")
	use.styles([themeCss, stylesCss])

	function updateLabel(n: string) {
		draft.label.value = n
	}

	return html`
		<section class=form>
			<label>
				<strong>Public Name</strong>

				<input
					type=text
					.value="${draft.label.value}"
					maxlength="${maxLabelLength}"
					@input="${inputString(updateLabel)}"
					?data-angry="${!validLabel(draft.label.value)}"
					/>

				<small class=details>
					<span>${renderThumbprint(draft.initial.id)}</span>
				</small>

				${!draft.getValid() ? html`
					<span class=invalid>invalid name</span>
				` : null}
			</label>
		</section>
	`
})

