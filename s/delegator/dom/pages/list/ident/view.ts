
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {when} from "lit/directives/when.js"
import {dom, shadow, useCss, useName, useShadow} from "@e280/sly"

import styleCss from "./style.css.js"
import {theme} from "../../../theme.js"
import {Identity} from "../../../../types.js"
import {deriveId} from "../../../../../lib/core/cryp/derive-id.js"
import dotsIcon from "../../../../../lib/ui/icons/tabler/dots.icon.js"
import {address} from "../../../../../lib/core/ergo/address/address.js"
import {addressColor} from "../../../../../lib/core/ergo/address/color.js"
import {addressEmoji} from "../../../../../lib/core/ergo/address/emoji.js"
import {addressMoniker} from "../../../../../lib/core/ergo/address/moniker.js"

export const Ident = shadow((options: {
		identity: Identity
		onClickCard?: () => void
		onClickDots?: () => void
	}) => {
	
	useName("ident")
	useCss(theme(), styleCss)

	const {alias} = options.identity
	const id = deriveId(options.identity.root)
	const addr = address(id)
	const short = addressMoniker(id)
	const color = `--color: ${addressColor(id)};`
	const [first, second] = addr.split("_")
	const shadow = useShadow()

	function onClick(event: PointerEvent) {
		if (!options.onClickCard) return
		const ignores = dom.all("[data-no-click]", shadow)
		const bad = ignores.some(ignore => event.composedPath().includes(ignore))
		if (bad) return
		options.onClickCard()
	}

	return html`
		<div part=card style="${color}" @click="${onClick}" ?data-clickable="${!!options.onClickCard}">
			<div part=icon>${addressEmoji(id)}</div>

			<div part=name>
				<div part=alias>${alias || short}</div>
			</div>

			<slot name=buttons data-no-click></slot>
		</div>

		<slot style="${color}"></slot>

		<footer>
			<p part=address data-no-click>
				${ShinyCopy.with({
					props: [addr],
					attrs: {title: addr},
					children: html`
						<span part=address title="${addr}">
							${first}_${second}...
						</span>
					`,
				})}
			</p>

			${when(options.onClickDots, click => html`
				<button
					class=dots-button
					x-vibe=naked
					@click="${click}">
						${dotsIcon}
				</button>
			`)}
		</footer>
	`
})

