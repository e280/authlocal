
import {debounce, html, shadowView} from "@benev/slate"
import stylesCss from "./styles.css.js"
import underCss from "../../under.css.js"

export const IdView = shadowView(use => (payload: string, preview?: string) => {
	use.name("id")
	use.styles(underCss, stylesCss)

	const truncated = payload.slice(0, 24)
	const copyStatus = use.signal<"good" | "bad" | undefined>(undefined)

	const clearStatus = use.once(() => debounce(1000, () => {
		copyStatus.value = undefined
	}))

	function copy() {
		navigator.clipboard.writeText(payload)
			.then(() => { copyStatus.value = "good" })
			.catch(() => { copyStatus.value = "bad" })
			.finally(() => clearStatus())
	}

	const tooltip = `Copy "${truncated}..."`

	return html`
		<span x-copy="${copyStatus}" title="${tooltip}">
			<span x-text @click="${copy}">${preview ?? truncated}</span>
			<span x-notify=good>Copied</span>
			<span x-notify=bad>Copy Failed</span>
		</span>
	`
})

