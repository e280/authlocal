
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {cssReset, shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {nomen} from "../../../core/index.js"
import {idColor} from "../../utils/id-color.js"
import {sigilSvg} from "../../utils/sigil-svg.js"

export const IdPoster = shadow((options: {
		id: string
		name?: string
		copyable?: boolean
	}) => {

	useName("id-card")
	useCss(cssReset, styleCss)

	const name = options.name || nomen.nom(options.id)
	const color = `--color: ${idColor(options.id)};`
	const m = nomen.from(options.id)
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
				<span class=name>${name}</span>
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

