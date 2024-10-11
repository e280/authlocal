
import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"

export const AuthApp = nexus.shadowComponent(use => {
	use.styles(styles)
	return html`
		<button>Create New Profile</button>
	`
})

