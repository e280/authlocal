
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {Upload} from "./subviews/upload/view.js"
import {Recovery} from "./subviews/recovery/view.js"
import {Situation} from "../../../logic/situation.js"

export const IngressPage = shadowView(use => (situation: Situation.Ingress) => {
	use.name("ingress-page")
	use.styles([themeCss, stylesCss])
	const {tabby} = situation.endeavor

	const {tabs, panel} = tabby.render([
		{button: () => "Uploader", panel: () => Upload([situation])},
		{button: () => "Recovery Seed", panel: () => Recovery([situation])},
	])

	return html`
		<section theme-plate>
			${tabs}
			${panel}
		</section>
	`
})

