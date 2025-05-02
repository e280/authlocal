
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {PassportDraft} from "../../common/passport-widget/draft.js"
import {PassportWidget} from "../../common/passport-widget/view.js"
import {crushUsername} from "../../../logic/utils/crush-username.js"
import {Tabby} from "../../../../common/views/tabby/view.js"
import {dehydratePassports} from "../../../../core/passport.js"

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
	const tabby = use.once(() => new Tabby(0))

	return html`
		<section theme-plate>
			${tabby.render([
				{button: () => html`Edit`, panel: () => html`
					<div theme-text>
						<h2>Choose a name</h2>
						<p>It'll be publicly viewable</p>
					</div>
					${PassportWidget(
						[draft, {allowEditing: true}],
						{content: html`
							<button theme-happy
								@click="${clickSave}"
								?disabled="${!draft.hasValidChanges()}">
									Save
							</button>
						`},
					)}
				`},

				{button: () => html`Seed`, panel: () => SeedReveal([
					seed.value,
					`${crushUsername(label)}.authlocal`,
				])},

				{button: () => html`Deletion`, panel: () => html`
					Deletion
				`},
			])}

			<footer theme-buttons>
				<button theme-back @click="${clickBack}">
					Back
				</button>
			</footer>
		</section>
	`
})

