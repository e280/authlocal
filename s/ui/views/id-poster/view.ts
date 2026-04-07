
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {cssReset, shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {address} from "../../../lib/index.js"
import {idColor} from "../../utils/id-color.js"
import {sigilSvg} from "../../utils/sigil-svg.js"

export const IdPoster = shadow((options: {
		id: string
		alias?: string
		copyable?: boolean
	}) => {

	useName("id-card")
	useCss(cssReset, styleCss)

	const alias = options.alias || address.addr(options.id)
	const color = `--color: ${idColor(options.id)};`
	const m = address.from(options.id)
	const [first, second, third] = m.split("_")

	const monikerSpan = html`
		<div class=nomen title="${m}">
			<span>${first}_${second}</span><span>_${third}</span>
		</div>
	`

	return html`
		<div part=poster style="${color}">
			<div class=icon>${sigilSvg(options.id)}</div>
			<div class=content>
				<span class=name>${alias}</span>
				${options.copyable
					? ShinyCopy.with({
						props: [m],
						children: monikerSpan,
					})
					: monikerSpan}
			</div>
		</div>
	`
})
