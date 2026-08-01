
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {cssReset, shadow, useCss, useName} from "@e280/sly"
import styleCss from "./style.css.js"
import {address} from "../../../core/ergo/address/address.js"
import {addressColor} from "../../../core/ergo/address/color.js"
import {addressEmoji} from "../../../core/ergo/address/emoji.js"
import {addressMoniker} from "../../../core/ergo/address/moniker.js"

export const Card = shadow((user: {id: string, alias?: string}) => {
	useName("card")
	useCss(cssReset, styleCss)

	const addr = address(user.id)
	const color = `--color: ${addressColor(user.id)};`

	return html`
		<div part=card style="${color}">
			<div part=icon>${addressEmoji(user.id)}</div>

			<div part=alias>${user.alias || addressMoniker(user.id)}</div>

			${ShinyCopy.with({
				props: [addr],
				attrs: {
					part: "copy",
					title: `copy address "${addr.slice(0, 20)}..."`,
				},
			})}
		</div>
	`
})

