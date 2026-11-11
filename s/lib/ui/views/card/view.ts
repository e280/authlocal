
import {html} from "lit"
import {debounce} from "@e280/stz"
import {shadowView, useCss, useName, useOnce, useSignal} from "@e280/sly"
import styleCss from "./style.css.js"
import uitheme from "../../uitheme.js"
import copyIcon from "../../icons/tabler/copy.icon.js"
import {address} from "../../../core/ergo/address/address.js"
import {addressColor} from "../../../core/ergo/address/color.js"
import {addressEmoji} from "../../../core/ergo/address/emoji.js"
import {addressMoniker} from "../../../core/ergo/address/moniker.js"

export const Card = shadowView((user: {id: string, alias?: string}) => {
	useName("card")
	useCss(uitheme, styleCss)
	const addr = address(user.id)

	const copyColor = `--fg: lime;`
	const failColor = `--fg: red;`
	const addrColor = `--fg: ${addressColor(user.id)};`

	const $special = useSignal<{color: string, note: string}>(
		{color: addrColor, note: ""}
	)

	const resetColor = useOnce(() => debounce(1000, () => $special({
		color: addrColor,
		note: "",
	})))

	async function copy() {
		await navigator.clipboard.writeText(user.id)
			.then(() => $special({color: copyColor, note: "copied to clipboard"}))
			.catch(() => $special({color: failColor, note: "copy failed"}))
			.then(() => resetColor())
	}

	function click(event: Event) {
		if (event.composedPath().some(x => x instanceof HTMLSlotElement)) return
		copy()
	}

	return html`
		<div
			part=card
			style="${$special().color}"
			title="${addr}"
			@click="${click}">
				<div part=icon>
					${$special().note
						? copyIcon
						: addressEmoji(user.id)}
				</div>
				<div part=alias>${user.alias || addressMoniker(user.id)}</div>
				<slot part=slot></slot>
				<div part=note ?hidden="${!$special().note}">${$special().note}</div>
		</div>
	`
})

