
import {html} from "lit"
import {cssReset, shadow, useCss, useName} from "@e280/sly"
import styleCss from "./style.css.js"
import {address} from "../../../core/index.js"

export const Poster = shadow((id: string, alias?: string) => {
	useName("id-poster")
	useCss(cssReset, styleCss)
	const color = `--color: ${address.color(id)};`

	return html`
		<div part=poster style="${color}">
			<div class=icon>${address.emoji(id)}</div>
			<div class=alias>${alias || address.moniker(id)}</div>
		</div>
	`
})

