
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"

import {Situation} from "../../../logic/situation.js"
import {Confirmer} from "../../common/confirmer/view.js"
import {randomDigits} from "../../../../tools/random-digits.js"

export const DeletePage = shadowView(use => (situation: Situation.Delete) => {
	use.name("delete-page")
	use.styles([themeCss, stylesCss])

	const {passports} = situation
	const requiredText = use.once(() => randomDigits(5))

	return html`
		<section theme-plate>
			<section theme-zone=danger>
				<h2>Delete ${passports.length} passport${passports.length === 1 ?"" :"s"}</h2>

				${Confirmer([{
					requiredText,
					buttonLabel: () => "Delete",
					onConfirmed: async() => {
						await situation.onDelete(situation.passports.map(p => p.id))
						await situation.onBack()
					},
				}])}
			</section>

			<footer theme-buttons>
				<button theme-button=back @click="${situation.onBack}">
					Back
				</button>
			</footer>
		</section>
	`
})

