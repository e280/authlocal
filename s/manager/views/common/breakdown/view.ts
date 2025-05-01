
import {html, shadowView, svgSlate} from "@benev/slate"

import {Passport} from "../../../../core/passport.js"
import {idPreview} from "../../../../tools/id-preview.js"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import userIcon from "../../../../common/icons/tabler/user.icon.js"

export const Breakdown = shadowView(use => (passports: Passport[]) => {
	use.name("breakdown")
	use.styles([themeCss, stylesCss])

	return html`
		<ul part="ul">
			${passports.map(passport => html`
				<li>
					${svgSlate(userIcon)}
					<span class=name>${passport.label.slice(0, 16)}</span>
					<span class=details>
						<small>${idPreview(passport.id)}</small>
					</span>
				</li>
			`)}
		</ul>
	`
})

