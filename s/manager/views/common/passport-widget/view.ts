
import {html, shadowView, Signal, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import {PassportPlacard} from "../../../../core/passport.js"
import {inputString} from "../../../../tools/input-string.js"
import {renderId} from "../../../../common/views/id/render-id.js"
import {maxLabelLength, validLabel} from "../../../logic/passports/utils/validation.js"

import userIcon from "../../../../common/icons/tabler/user.icon.js"

export type PassportEditing = {
	label: string
	valid: boolean
}

export type PassportWidgetOptions = {
	placard: PassportPlacard
	editing?: Signal<PassportEditing>
}

export const PassportWidget = shadowView(use => ({
		placard,
		editing,
	}: PassportWidgetOptions) => {

	use.name("passport-widget")
	use.styles([themeCss, stylesCss])

	return html`
		<section theme-juicy>
			${svgSlate(userIcon)}

			<div class=alpha>
				${editing ? html`
					<input type=text class=label
						.value="${editing.value.label}"
						maxlength="${maxLabelLength}"
						?data-angry="${!editing.value.valid}"
						@input="${inputString(label => {
							editing.value = {label, valid: validLabel(label)}
						})}"
						/>
				` : html`
					<div class=label>${placard.label}</div>
				`}
				<div class=id>${renderId(placard.id)}</div>
			</div>
		</section>
	`
})

