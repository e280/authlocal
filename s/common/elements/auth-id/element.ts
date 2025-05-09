
import {debounce} from "@e280/stz"
import {Content, ShadowElement, attributes, mixin, signal} from "@benev/slate"

import stylesCss from "./styles.css.js"
import underCss from "../../under.css.js"
import {renderId} from "../../views/copier/render-id.js"

@mixin.css(underCss, stylesCss)
export class AuthId extends ShadowElement {
	attrs = attributes(this, {"hex": String})
	copyStatus = signal<"good" | "bad" | undefined>(undefined)

	clearStatus = debounce(1000, () => {
		this.copyStatus.value = undefined
	})

	render(): Content {
		let {hex} = this.attrs

		if (hex === undefined) {
			console.error(`<auth-id> element attr [hex] is required`)
			hex = ""
		}

		return renderId(hex)
	}
}

