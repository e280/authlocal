
import {debounce, html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"

const time = 1000

export const IdView = shadowView(use => (hex: string, alias?: string) => {
	alias ??= hex.slice(0, 8)
	use.styles(themeCss, stylesCss)

	const copyStatus = use.signal<"good" | "bad" | undefined>(undefined)

	const clearStatus = use.once(() => debounce(time, () => {
		copyStatus.value = undefined
	}))

	function copy() {
		navigator.clipboard.writeText(hex)
			.then(() => { copyStatus.value = "good" })
			.catch(() => { copyStatus.value = "bad" })
			.finally(() => clearStatus())
	}


	return html`
		<span x-copy="${copyStatus}" title='copy "${alias}.."'>
			<span x-text @click="${copy}">${alias}</span>
			<span x-notify=good>Copied</span>
			<span x-notify=bad>Copy Failed</span>
		</span>
	`
})

