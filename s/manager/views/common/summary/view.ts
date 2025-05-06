
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {Identity} from "../../../../core/identity.js"
import {idPreview} from "../../../../tools/id-preview.js"

export const Summary = shadowView(use => (identities: Identity[]) => {
	use.name("summary")
	use.styles([themeCss, stylesCss])

	return html`
		<ul class=identities>
			${identities.map(identity => html`
				<li x-id="${identity.id}">
					<span class=label>${identity.label}</span>
					<span class=id>${idPreview(identity.id)}</span>
				</li>
			`)}
		</ul>
	`
})

