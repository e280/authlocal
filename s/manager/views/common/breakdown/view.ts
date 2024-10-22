
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {whence} from "../../../../tools/whence.js"
import themeCss from "../../../../common/theme.css.js"
import {svgSlate} from "../../../../tools/svg-slate.js"
import {Identity} from "../../../../common/auth/identity.js"
import circleKeyIcon from "../../../../common/icons/tabler/circle-key.icon.js"

export const Breakdown = shadowView(use => (identities: Identity[]) => {
	use.styles([themeCss, stylesCss])

	return html`
		<ul>
			${identities.map(identity => html`
				<li>
					${svgSlate(circleKeyIcon)}
					<span class=name>${identity.name}</span>
					<span class=details>
						<small>${whence(identity.created)}</small>
						<small>${identity.thumbprint.slice(0, 8)}</small>
					</span>
				</li>
			`)}
		</ul>
	`
})

