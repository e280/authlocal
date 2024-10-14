
import {html} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {nexus} from "../../../nexus.js"
import {whence} from "../../../../tools/whence.js"
import {Identity} from "../../../../auth/types.js"
import {svgSlate} from "../../../../tools/svg-slate.js"
import circleKeyIcon from "../../../icons/tabler/circle-key.icon.js"

export const Breakdown = nexus.shadowView(use => (identities: Identity[]) => {
	use.styles(stylesCss)

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

