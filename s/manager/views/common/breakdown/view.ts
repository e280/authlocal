
import {Badge} from "@e280/stz"
import {html, shadowView, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {whence} from "../../../../tools/whence.js"
import themeCss from "../../../../common/theme.css.js"
import userIcon from "../../../../common/icons/tabler/user.icon.js"
import {Passport} from "../../../../crypto/concepts.js"

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
						<small>${whence(passport.issued)}</small>
						<small>${Badge.fromHex(passport.id).preview}</small>
					</span>
				</li>
			`)}
		</ul>
	`
})

