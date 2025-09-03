
import {html} from "lit"
import {view} from "@e280/sly"
import {Thumbprint} from "@e280/stz"
import {Copyable} from "../../views/copyable/view.js"

export const AuthSigil = view.component(use => {
	const {hex} = use.attrs({hex: String})

	if (hex === undefined)
		console.error(`<auth-sigil> element attr [hex] is required`)

	const {sigil, thumbprint} = Thumbprint.build.fromHex(hex ?? "")

	return Copyable
		.children(html`<div part="copybox">${sigil}</div>`)
		.props(thumbprint)
})

