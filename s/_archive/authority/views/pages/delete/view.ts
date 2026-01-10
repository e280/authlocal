
import {html} from "lit"
import {view} from "@e280/sly"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {Summary} from "../../common/summary/view.js"
import {Situation} from "../../../logic/situation.js"
import {Confirmer} from "../../common/confirmer/view.js"
import {randomDigits} from "../../../utils/random-digits.js"

export const DeletePage = view(use => (situation: Situation.Delete) => {
	use.name("delete-page")
	use.styles([themeCss, stylesCss])

	const {identities} = situation
	const requiredText = use.once(() => randomDigits(5))

	return html`
		<section theme-plate>
			<section theme-zone=danger>
				<h2>Delete ${identities.length} ${identities.length === 1 ?"identity" :"identities"}</h2>

				${Summary(identities)}

				${Confirmer({
					requiredText,
					buttonLabel: () => "Delete",
					onConfirmed: async() => {
						await situation.onDelete(situation.identities.map(p => p.id))
						await situation.onBack()
					},
				})}
			</section>

			<footer theme-buttons>
				<button theme-button=back @click="${situation.onBack}">
					Back
				</button>
			</footer>
		</section>
	`
})

