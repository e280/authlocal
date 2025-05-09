
import {debounce, Thumbprint} from "@e280/stz"
import {Content, ShadowElement, attributes, html, mixin, signal} from "@benev/slate"

import stylesCss from "./styles.css.js"
import underCss from "../../under.css.js"
import {Copyable} from "../../views/copyable/view.js"

@mixin.css(underCss, stylesCss)
export class AuthId extends ShadowElement {
	copyStatus = signal<"good" | "bad" | undefined>(undefined)

	attrs = attributes(this, {
		"hex": String,
		"short": Boolean,
	})

	clearStatus = debounce(1000, () => {
		this.copyStatus.value = undefined
	})

	render(): Content {
		let {hex, short} = this.attrs

		if (hex === undefined) {
			console.error(`<auth-id> element attr [hex] is required`)
			hex = ""
		}

		const delimiter = "."
		const {sigil, thumbprint} = Thumbprint.build.fromHex(hex)
		const [a, b, c, d] = sigil.split(delimiter)

		const strong = html`<span part="strong">${[a, b].join(delimiter)}</span>`
		const weak = short
			? null
			: html`<span part="weak">.${[c, d].join(delimiter)}</span>`

		return Copyable([thumbprint], {content: html`
			<div part="copybox">
				${strong}${weak}
			</div>
		`})
	}
}

