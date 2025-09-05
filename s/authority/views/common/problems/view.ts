
import {html} from "lit"
import {view} from "@e280/sly"
import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

export const Problems = view(use => (problems: string[]) => {
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

