
import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Situation} from "../../logic/situation.js"
import {renderEditableName} from "./parts/render-editable-name.js"

export const CreateView = nexus.shadowView(use => (situation: Situation.Create) => {
	use.name("create")
	use.styles(styles)

	const {identity} = situation
	const name = use.signal(identity.name)

	function done() {
		identity.name = name.value
		situation.onComplete(identity)
	}

	return html`
		<section class=form>
			${renderEditableName(identity, name)}
		</section>

		<footer>
			<button @click="${situation.onCancel}">Cancel</button>
			<button class=happy @click="${done}">Create Identity</button>
		</footer>
	`
})

