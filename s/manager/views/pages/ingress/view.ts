
import {MapG} from "@e280/stz"
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"

import {Situation} from "../../../logic/situation.js"

export const IngressPage = shadowView(use => (situation: Situation.Ingress) => {
	use.name("ingress")
	use.styles([themeCss, stylesCss])

	return html`
		<section theme-plate>
			<h2>Ingress</h2>
		</section>
	`
})

