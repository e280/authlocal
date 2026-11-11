
import {html} from "lit"
import {debounce} from "@e280/stz"
import {shadowView, useCss, useName, useOnce, useShadow, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import uitheme from "../../uitheme.js"
import {address} from "../../../core/ergo/address/address.js"
import {addressColor} from "../../../core/ergo/address/color.js"
import {addressEmoji} from "../../../core/ergo/address/emoji.js"
import {addressMoniker} from "../../../core/ergo/address/moniker.js"

export const Card = shadowView((user: {id: string, alias?: string}) => {
	useName("card")
	useCss(uitheme, styleCss)
	const shadow = useShadow()

	const addr = address(user.id)

	const copyColor = `--fg: lime;`
	const failColor = `--fg: red;`
	const addrColor = `--fg: ${addressColor(user.id)};`
	const $special = useSignal<{color: string, note: string}>({color: addrColor, note: ""})
	const resetColor = useOnce(() => debounce(1000, () => $special({color: addrColor, note: ""})))

	async function copy() {
		await navigator.clipboard.writeText(user.id)
			.then(() => $special({color: copyColor, note: "copied to clipboard"}))
			.catch(() => $special({color: failColor, note: "copy failed"}))
			.then(() => resetColor())
	}

	function click(event: Event) {
		const slot = shadow.querySelector("slot")!
		if (event.composedPath().includes(slot)) return
		copy()
	}

	return html`
		<div
			part=card
			style="${$special().color}"
			title="${addr}"
			@click="${click}">
				<div part=icon>${addressEmoji(user.id)}</div>
				<div part=alias>${user.alias || addressMoniker(user.id)}</div>
				<slot part=slot></slot>
				${$special().note
					? html`<div part=note>${$special().note}</div>`
					: null}
		</div>
	`
})

