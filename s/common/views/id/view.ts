
import {debounce, Hex, html, shadowView, Urname} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../theme.css.js"

const time = 1000

export const IdView = shadowView(use => (hex: string) => {
	const bytes = Hex.bytes(hex)
	const urname = Urname.string(bytes.slice(0, 4))

	use.name("id")
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
		<span x-copy="${copyStatus}" title='copy "${hex.slice(0, 8)}.."'>
			<span x-text @click="${copy}">${urname}</span>
			<span x-notify=good>Copied</span>
			<span x-notify=bad>Copy Failed</span>
		</span>
	`
})

