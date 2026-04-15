
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {cssReset, shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {idColor} from "../../utils/id-color.js"
import {address} from "../../../lib/index.js"
import {sigilSvg} from "../../utils/sigil-svg.js"

export const IdCard = shadow((card: {
		id: string
		alias?: string
		copyable?: boolean
	}) => {

	useName("id-card")
	useCss(cssReset, styleCss)

	const color = `--color: ${idColor(card.id)};`
	const n = address.from(card.id)
	const [first, second, third] = n.split("_")

	const nomenSpan = html`
		<span part=nomen title="${n}">
			<span class=nom>${first}_${second}</span><span class=bulk>_${third}</span>
		</span>
	`

	return html`
		<div part=card style="${color}">
			<div part=plate>
				<div part=icon>${sigilSvg(card.id)}</div>
				<div part=name>${card.alias || address.short(card.id)}</div>
				<slot part=slot></slot>
			</div>

			<footer part=nomen>
				${card.copyable
					? ShinyCopy.with({
						props: [n],
						attrs: {title: n},
						children: nomenSpan,
					})
					: nomenSpan}
			</footer>
		</div>
	`
})
