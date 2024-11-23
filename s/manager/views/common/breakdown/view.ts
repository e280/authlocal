
import {html, shadowView, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {whence} from "../../../../tools/whence.js"
import {Passport} from "../../../../auth/passport.js"
import themeCss from "../../../../common/theme.css.js"
import userIcon from "../../../../common/icons/tabler/user.icon.js"

export const Breakdown = shadowView(use => (passports: Passport[]) => {
	use.styles([themeCss, stylesCss])

	return html`
		<ul>
			${passports.map(passport => html`
				<li>
					${svgSlate(userIcon)}
					<span class=name>${passport.name}</span>
					<span class=details>
						<small>${whence(passport.created)}</small>
						<small>${passport.thumbprint.slice(0, 8)}</small>
					</span>
				</li>
			`)}
		</ul>
	`
})

