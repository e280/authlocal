
import {html} from "@benev/slate"
import {nexus} from "../../nexus.js"
import stylesCss from "./styles.css.js"

export const AuthduoLogin = nexus.shadowComponent(use => {
	use.styles(stylesCss)

	return html`
		<button>login</button>
	`
})

