
import {html} from "lit"
import {view} from "@e280/sly"
import {Thumbprint} from "@e280/stz"

import styleCss from "./style.css.js"
import {commonCss} from "../common.css.js"
import {Copyable} from "../copyable/view.js"

export const AuthSigil = view.component(use => {
	use.css(commonCss, styleCss)
	const {hex} = use.attrs({hex: String})

	if (hex === undefined)
		console.error(`<auth-sigil> element attr [hex] is required`)

	const {sigil, thumbprint} = Thumbprint.build.fromHex(hex ?? "")

	return Copyable.props(thumbprint)
		.children(html`<div part="copybox">${sigil}</div>`)
		.render()
})

