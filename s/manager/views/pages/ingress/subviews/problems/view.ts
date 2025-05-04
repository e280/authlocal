
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../../../common/theme.css.js"

export const Problems = shadowView(use => (problems: string[]) => {
	use.name("problems")
	use.styles([themeCss, stylesCss])

	return html`
		<ol theme-zone=danger>
			${problems.map(problem => html`
				<li>${problem}</li>
			`)}
		</ol>
	`
})

