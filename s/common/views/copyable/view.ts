
import {debounce, html, shadowView} from "@benev/slate"
import stylesCss from "./styles.css.js"
import underCss from "../../under.css.js"

export const Copyable = shadowView(use => (payload: string) => {
	use.name("copyable")
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
			<slot @click="${copy}"></slot>
			<span x-notify=good>Copied</span>
			<span x-notify=bad>Copy Failed</span>
		</span>
	`
})

