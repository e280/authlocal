
import {debounce} from "@e280/stz"
import {ShadowElement, TemplateResult, attributes, html, mixin, signal} from "@benev/slate"

import stylesCss from "./styles.css.js"
import underCss from "../../under.css.js"

@mixin.reactive()
@mixin.css(underCss, stylesCss)
export class AuthId extends ShadowElement {

	attrs = attributes(this, {
		"copy": String,
		"show": String,
	})

	copyStatus = signal<"good" | "bad" | undefined>(undefined)

	clearStatus = debounce(1000, () => {
		this.copyStatus.value = undefined
	})

	render(): TemplateResult {
		let {copy, show} = this.attrs

		if (copy === undefined) {
			console.error(`<auth-id> element attr [copy] is required`)
			copy = ""
		}

		const truncated = copy.slice(0, 24)

		const clickCopy = () => {
			navigator.clipboard.writeText(copy)
				.then(() => { this.copyStatus.value = "good" })
				.catch(() => { this.copyStatus.value = "bad" })
				.finally(() => this.clearStatus())
		}

		const tooltip = `Copy "${truncated}..."`

		return html`
			<span x-copy="${this.copyStatus.value}" title="${tooltip}">
				<span x-text @click="${clickCopy}">${show ?? truncated}</span>
				<span x-notify=good>Copied</span>
				<span x-notify=bad>Copy Failed</span>
			</span>
		`
	}
}

