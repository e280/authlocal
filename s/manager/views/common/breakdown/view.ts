
import {Badge, html, shadowView, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {whence} from "../../../../tools/whence.js"
import {Passport} from "../../../../auth/passport.js"
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
					<span class=name>${passport.name.slice(0, 16)}</span>
					<span class=details>
						<small>${whence(passport.created)}</small>
						<small>${Badge.fromHex(passport.thumbprint).preview}</small>
					</span>
				</li>
			`)}
		</ul>
	`
})

