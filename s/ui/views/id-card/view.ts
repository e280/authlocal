
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {cssReset, shadow, useCss, useName} from "@e280/sly"

import styleCss from "./style.css.js"
import {idColor} from "../../utils/id-color.js"
import {moniker} from "../../../core/index.js"
import userIcon from "../../icons/user.icon.js"

export const IdCard = shadow((card: {
		id: string
		name?: string
		copyable?: boolean
	}) => {

	useName("id-card")
	useCss(cssReset, styleCss)

	const color = `--color: ${idColor(card.id)};`
	const m = moniker(card.id)
	const [first, second, third] = m.split("_")

	const monikerSpan = html`
		<span class=moniker>
			<span class=sigil>${first}_${second}</span><span class=bulk>_${third}</span>
		</span>
	`

	return html`
		<div class=card style="${color}" part=card>
			<div class=icon>${userIcon}</div>
			<div class=content>
				${card.name && html`<span class=name>${card.name}</span>`}
				${card.copyable
					? ShinyCopy.with({
						props: [m],
						children: monikerSpan,
					})
					: monikerSpan}
			</div>
		</div>
	`
})

