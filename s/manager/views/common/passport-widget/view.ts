
import {html, shadowView, Signal, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import {idHue} from "../../../../common/utils/id-hue.js"
import {PassportPlacard} from "../../../../core/passport.js"
import {inputString} from "../../../../tools/input-string.js"
import {renderId} from "../../../../common/views/id/render-id.js"
import {maxLabelLength, validLabel} from "../../../logic/utils/validation.js"

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

	const hsl = `hsl(${idHue(placard.id)}deg, 100%, 75%)`

	return html`
		<div class=card theme-juicy>
			<div class=icon style="color: ${hsl};">
				${svgSlate(userIcon)}
			</div>
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
					<div class="text label">${placard.label}</div>
				`}
			</div>
			<slot></slot>
		</div>
		<div class=id>${renderId(placard.id)}</div>
	`
})

