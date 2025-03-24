
import {Barname, Hex, html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {Breakdown} from "../../common/breakdown/view.js"
import {signalInput} from "../../../../tools/signal-input.js"

export const DeletePage = shadowView(use => (situation: Situation.Delete) => {
	use.styles([themeCss, stylesCss])

	const {passport} = situation

	const confirmCode = use.once(() => {
		const bytes = Hex.bytes(passport.thumbprint)
		return Barname.string(bytes.slice(0, 2))
	})

	const confirmation = use.signal("")
	const confirmationAccepted = use.computed(() => confirmation.value.toLowerCase() === confirmCode.toLowerCase())

	function deleteForever() {
		situation.onComplete(passport)
	}

	return html`
		<div class=plate>
			<header>
				<h2 class=instruction>Delete Passport?</h2>
			</header>

			<p>Are you absolutely super-duper sure you want to delete this passport? It will be <strong>gone forever</strong>, unless you have it saved elsewhere.</p>

			${Breakdown([[passport]])}

			<label>
				<span>If you're certain, confirm by typing "<code>${confirmCode}</code>" exactly:</span>
				<input type=text .value="${confirmation}" @input="${signalInput(confirmation)}"/>
			</label>

			<footer class=buttonbar>
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
		</div>
	`
})

