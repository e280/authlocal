

import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {Breakdown} from "../../common/breakdown/view.js"
import {signalInput} from "../../../../tools/signal-input.js"

export const DeletePage = shadowView(use => (situation: Situation.Delete) => {
	use.styles([themeCss, stylesCss])

	const {passport} = situation
	const thumb = use.once(() => passport.thumbprint.slice(0, 5))
	const confirmation = use.signal("")
	const confirmationAccepted = use.computed(() => confirmation.value.toLowerCase() === thumb.toLowerCase())

	function deleteForever() {
		situation.onComplete(passport)
	}

	return html`
		<h2>Delete Passport</h2>
		<p>Are you absolutely super-duper sure you want to delete this passport?</p>

		${Breakdown([[passport]])}

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

