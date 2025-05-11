
import {debounce, Thumbprint} from "@e280/stz"
import {Content, ShadowElement, attributes, html, mixin, signal} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Copyable} from "../../views/copyable/view.js"

@mixin.css(stylesCss)
export class AuthSigil extends ShadowElement {
	copyStatus = signal<"good" | "bad" | undefined>(undefined)

	attrs = attributes(this, {
		"hex": String,
	})

	clearStatus = debounce(1000, () => {
		this.copyStatus.value = undefined
	})

	render(): Content {
		let {hex} = this.attrs

		if (hex === undefined) {
			console.error(`<auth-sigil> element attr [hex] is required`)
			hex = ""
		}

		const {sigil, thumbprint} = Thumbprint.build.fromHex(hex)

		return Copyable([thumbprint], {content: html`
			<div part="copybox">${sigil}</div>
		`})
	}
}

