
import {html} from "lit"
import {ShinyCopy} from "@e280/shiny"
import {cssReset, dom, shadow, useCss, useName, useShadow} from "@e280/sly"

import styleCss from "./style.css.js"
import {Identity} from "../../../types.js"
import {idColor} from "../../../../ui/utils/id-color.js"
import {address, deriveId} from "../../../../lib/index.js"
import {sigilSvg} from "../../../../ui/utils/sigil-svg.js"

export const Ident = shadow((options: {
		identity: Identity
		onClick?: () => void
	}) => {
	
	useName("id-card")
	useCss(cssReset, styleCss)

	const {alias} = options.identity
	const id = deriveId(options.identity.root)
	const addr = address.from(id)
	const short = address.moniker(id)
	const color = `--color: ${idColor(id)};`
	const [first, second] = addr.split("_")
	const shadow = useShadow()

	function onClick(event: PointerEvent) {
		if (!options.onClick) return
		const ignores = dom.all("[data-no-click]", shadow)
		const bad = ignores.some(ignore => event.composedPath().includes(ignore))
		if (bad) return
		options.onClick()
	}

	return html`
		<div part=card style="${color}">
			<div part=plate @click="${onClick}">
				<div part=icon>${sigilSvg(id)}</div>
				<div part=name>
					<div part=alias>${alias || short}</div>
					<div part=address data-no-click>
						${ShinyCopy.with({
							props: [addr],
							attrs: {title: addr},
							children: html`
								<span part=address title="${addr}">
									${first}_${second}...
								</span>
							`,
						})}
					</div>
				</div>
				<slot name=buttons data-no-click></slot>
			</div>
		</div>

		<slot style="${color}"></slot>
	`
})
