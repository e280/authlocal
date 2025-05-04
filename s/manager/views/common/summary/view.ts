
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"

import {Passport} from "../../../../core/passport.js"
import {idPreview} from "../../../../tools/id-preview.js"

export const Summary = shadowView(use => (passports: Passport[]) => {
	use.name("summary")
	use.styles([themeCss, stylesCss])

	return html`
		<ul class=passports>
			${passports.map(passport => html`
				<li x-id="${passport.id}">
					<span class=label>${passport.label}</span>
					<span class=id>${idPreview(passport.id)}</span>
				</li>
			`)}
		</ul>
	`
})

