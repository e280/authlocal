
import {html} from "lit"
import {cssReset, shadow, useCss, useName} from "@e280/sly"
import styleCss from "./style.css.js"
import {addressColor} from "../../../core/ergo/address/color.js"
import {addressEmoji} from "../../../core/ergo/address/emoji.js"
import {addressMoniker} from "../../../core/ergo/address/moniker.js"

export const Poster = shadow((id: string, alias?: string) => {
	useName("id-poster")
	useCss(cssReset, styleCss)
	const color = `--color: ${addressColor(id)};`

	return html`
		<div part=poster style="${color}">
			<div class=icon>${addressEmoji(id)}</div>
			<div class=alias>${alias || addressMoniker(id)}</div>
		</div>
	`
})

