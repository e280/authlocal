
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {dehydratePassports} from "../../../../index.core.js"
import {PassportDraft} from "../../common/passport-widget/draft.js"
import {PassportWidget} from "../../common/passport-widget/view.js"
import {crushUsername} from "../../../logic/utils/crush-username.js"

export const EditPage = shadowView(use => (situation: Situation.Edit) => {
	use.styles([themeCss, stylesCss])

	const seed = use.signal(situation.seed)
	const draft = use.once(() => new PassportDraft(situation.passport))

	const clickBack = () => situation.onBack()
	const clickSave = async() => {
		const passport = draft.getValidEditedPassport()
		if (passport) {
			draft.passport = passport
			seed.value = await dehydratePassports([passport])
			await situation.onSave(passport)
		}
	}

	const label = draft.getValidEditedPassport()?.label ?? draft.passport.label

	return html`
		<div theme-header theme-counterbalance>
			<h2>Edit Passport</h2>
		</div>

		<section theme-plate=bg>
			${PassportWidget([draft, {allowEditing: true}], {content: html`
				<button theme-happy
					@click="${clickSave}"
					?disabled="${!draft.hasValidChanges()}">
						Save
				</button>
			`})}
		</section>

		<section theme-plate=bg>
			<header theme-header>
				<h2>Recovery seed</h2>
			</header>

			${SeedReveal([seed.value, `${crushUsername(label)}.authlocal`])}
		</section>

		<footer theme-buttons>
			<button theme-back @click="${clickBack}">
				Back
			</button>
		</footer>
	`
})

