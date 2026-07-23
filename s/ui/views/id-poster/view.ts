
import {html} from "lit"
import {cssReset, shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {address} from "../../../lib/index.js"

export const IdPoster = shadow((options: {
		id: string
		alias?: string
	}) => {

	useName("id-poster")
	useCss(cssReset, styleCss)

	const alias = options.alias || address.moniker(options.id)
	const color = `--color: ${address.color(options.id)};`

	return html`
		<div part=poster style="${color}">
			<div class=icon>${address.emoji(options.id)}</div>
			<div class=alias>${alias}</div>
		</div>
	`
})

