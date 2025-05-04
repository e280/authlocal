
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {Confirmer} from "../../common/confirmer/view.js"
import {idPreview} from "../../../../tools/id-preview.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {Tabby} from "../../../../common/views/tabby/view.js"
import {dehydratePassports} from "../../../../core/passport.js"
import {PassportDraft} from "../../common/passport-widget/draft.js"
import {crushUsername} from "../../../logic/utils/crush-username.js"
import {passportCard, PassportWidget} from "../../common/passport-widget/view.js"

export const EditPage = shadowView(use => (situation: Situation.Edit) => {
	use.name("edit-page")
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

	const {tabs, panel} = tabby.render([
		{button: () => html`Edit`, panel: () => html`
			${PassportWidget(
				[draft, {editable: true}],
				{content: html`
					<button
						theme-button=happy
						@click="${clickSave}"
						?disabled="${!draft.hasValidChanges()}">
							Save
					</button>
				`},
			)}
		`},

		{button: () => html`Seed`, panel: () => html`
			${passportCard(draft.passport)}
			<section theme-group class=seedtext>
				${SeedReveal([
					seed.value,
					`${crushUsername(label)}.authlocal`,
				])}
			</section>
		`},

		{button: () => html`Deletion`, panel: () => html`
			${passportCard(draft.passport)}
			<section theme-zone=danger>
				<h2>Delete this passport</h2>
				${Confirmer([{
					buttonLabel: () => "Delete",
					requiredText: idPreview(draft.passport.id),
					onConfirmed: async() => {
						await situation.onDelete(draft.passport)
						await situation.onBack()
					},
				}], {content: html`
					<h2 class=delete-heading>Delete "${draft.passport.label}"</h2>
				`})}
			</section>
		`},
	])

	return html`
		<section theme-plate>
			${tabs}
			${panel}
			<footer theme-buttons>
				<button theme-button=back @click="${clickBack}">
					Back
				</button>
			</footer>
		</section>
	`
})

