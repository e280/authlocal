

import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Situation} from "../../situation.js"
import {signalInput} from "../../../tools/signal-input.js"

export const DeleteView = nexus.shadowView(use => (situation: Situation.Delete) => {
	use.styles(styles)

	const {identity} = situation
	const thumb = use.once(() => identity.id.slice(0, 5))
	const confirmation = use.signal("")
	const confirmationAccepted = use.computed(() => confirmation.value.toLowerCase() === thumb.toLowerCase())

	function deleteForever() {
		situation.onComplete(identity)
	}

	return html`
		<p>Are you absolutely super sure you want to <strong>permanently delete the identity "${identity.name}"</strong></p>
		<label>
			<span>To confirm, you must type "${thumb}" exactly:</span>
			<input type=text value="${confirmation}" @input="${signalInput(confirmation)}"/>
		</label>
		<div>
			<button @click="${() => situation.onCancel()}">
				Cancel
			</button>
			<button
				class=angry
				?disabled="${!confirmationAccepted.value}"
				@click="${deleteForever}"
				>
				Delete Forever
			</button>
		</div>
	`
})

