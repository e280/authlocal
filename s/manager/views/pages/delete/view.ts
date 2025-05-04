
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"

import {Situation} from "../../../logic/situation.js"

export const DeletePage = shadowView(use => (situation: Situation.Delete) => {
	use.name("delete-page")
	use.styles([themeCss, stylesCss])

	return html`
		<section theme-plate>
			<h1>${situation}</h1>
		</section>
	`
})

