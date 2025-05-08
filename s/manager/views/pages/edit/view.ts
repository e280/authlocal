
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {Tabby} from "../../common/tabby/view.js"
import {constants} from "../../../../constants.js"
import {Situation} from "../../../logic/situation.js"
import {Confirmer} from "../../common/confirmer/view.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {dehydrateIdentities} from "../../../../core/identity.js"
import {IdentityDraft} from "../../common/identity-widget/draft.js"
import {crushUsername} from "../../../../common/utils/crush-username.js"
import {identityWidget, IdentityWidget} from "../../common/identity-widget/view.js"
import { Thumbprint } from "@e280/stz"

export const EditPage = shadowView(use => (situation: Situation.Edit) => {
	use.name("edit-page")
	use.styles([themeCss, stylesCss])

	const seed = use.signal(situation.seed)
	const draft = use.once(() => new IdentityDraft(situation.identity))

	const clickBack = () => situation.onBack()
	const clickSave = async() => {
		const identity = draft.getValidEditedIdentity()
		if (identity) {
			draft.identity = identity
			seed.value = await dehydrateIdentities(identity)
			await situation.onSave(identity)
		}
	}

	const label = draft.getValidEditedIdentity()?.label ?? draft.identity.label
	const tabby = use.once(() => new Tabby(0))

	const {tabs, panel} = tabby.render([
		{button: () => html`Edit`, panel: () => html`
			${IdentityWidget(
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
			${identityWidget(draft.identity)}
			<section theme-group class=seedtext>
				${SeedReveal([
					seed.value,
					crushUsername(label) + constants.seedExtension,
				])}
			</section>
		`},

		{button: () => html`Deletion`, panel: () => html`
			${identityWidget(draft.identity)}
			<section theme-zone=danger>
				<h2>Delete this identity</h2>
				${Confirmer([{
					buttonLabel: () => "Delete",
					requiredText: Thumbprint.hexsigil(draft.identity.id),
					onConfirmed: async() => {
						await situation.onDelete(draft.identity)
						await situation.onBack()
					},
				}], {content: html`
					<h2 class=delete-heading>Delete "${draft.identity.label}"</h2>
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

