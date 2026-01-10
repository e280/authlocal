
import {html} from "lit"
import {view} from "@e280/sly"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {Upload} from "./subviews/upload/view.js"
import {Recovery} from "./subviews/recovery/view.js"
import {Situation} from "../../../logic/situation.js"

export const IngressPage = view(use => (situation: Situation.Ingress) => {
	use.name("ingress-page")
	use.styles([themeCss, stylesCss])
	const {tabby} = situation.intake

	const {tabs, panel} = tabby.render([
		{button: () => "Uploader", panel: () => Upload(situation)},
		{button: () => "Recovery Seed", panel: () => Recovery(situation)},
	])

	return html`
		<section theme-plate>
			${tabs}
			${panel}
		</section>
	`
})

