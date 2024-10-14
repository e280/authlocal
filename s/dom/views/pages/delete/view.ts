

import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../../nexus.js"
import {Situation} from "../../../logic/situation.js"
import {signalInput} from "../../../../tools/signal-input.js"
import { Breakdown } from "../../common/breakdown/view.js"

export const DeletePage = nexus.shadowView(use => (situation: Situation.Delete) => {
	use.styles(styles)

	const {identity} = situation
	const thumb = use.once(() => identity.thumbprint.slice(0, 5))
	const confirmation = use.signal("")
	const confirmationAccepted = use.computed(() => confirmation.value.toLowerCase() === thumb.toLowerCase())

	function deleteForever() {
		situation.onComplete(identity)
	}

	return html`
		<h2>Delete Identity</h2>
		<p>Are you absolutely super-duper sure you want to delete this identity?</p>

		${Breakdown([[identity]])}

		<p>It will be <strong>gone forever</strong>, unless you have it saved elsewhere.</p>

		<label>
			<span>If you're certain, confirm by typing "<code>${thumb}</code>" exactly:</span>
			<input type=text .value="${confirmation}" @input="${signalInput(confirmation)}"/>
		</label>

		<footer>
			<button @click="${() => situation.onCancel()}">
				Cancel
			</button>

			<button
				class=angry
				?disabled="${!confirmationAccepted.value}"
				@click="${deleteForever}">
				Delete Forever
			</button>
		</footer>
	`
})

