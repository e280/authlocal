
import {html} from "lit"
import {view} from "@e280/sly"
import {Thumbprint} from "@e280/stz"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {Tabby} from "../../common/tabby/view.js"
import {constants} from "../../../../constants.js"
import {Situation} from "../../../logic/situation.js"
import {Confirmer} from "../../common/confirmer/view.js"
import {seedPack} from "../../../../trust/exports/authority.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {IdentityDraft} from "../../common/identity-widget/draft.js"
import {crushUsername} from "../../../../app/utils/crush-username.js"
import {identityWidget, IdentityWidget} from "../../common/identity-widget/view.js"

export const EditPage = view(use => (situation: Situation.Edit) => {
	use.name("edit-page")
	use.styles([themeCss, stylesCss])

	const $seed = use.signal(situation.seed)
	const draft = use.once(() => new IdentityDraft(situation.identity))

	const clickBack = () => situation.onBack()
	const clickSave = async() => {
		const identity = draft.getValidEditedIdentity()
		if (identity) {
			draft.identity = identity
			$seed.value = await seedPack(identity)
			await situation.onSave(identity)
		}
	}

	const label = draft.getValidEditedIdentity()?.label ?? draft.identity.label
	const tabby = use.once(() => new Tabby(0))

	const {tabs, panel} = tabby.render([
		{button: () => html`Edit`, panel: () => html`
			${IdentityWidget
				.props(draft, {editable: true})
				.children(html`
					<button
						theme-button=happy
						@click="${clickSave}"
						?disabled="${!draft.hasValidChanges()}">
							Save
					</button>
				`)
				.render()}
		`},

		{button: () => html`Seed`, panel: () => html`
			${identityWidget(draft.identity)}
			<section theme-group class=seedtext>
				${SeedReveal(
					$seed.value,
					crushUsername(label) + constants.seedExtension,
				)}
			</section>
		`},

		{button: () => html`Deletion`, panel: () => html`
			${identityWidget(draft.identity)}

			<section theme-zone=danger>
				<h2>Delete this identity</h2>

				${Confirmer
					.props({
						buttonLabel: () => "Delete",
						requiredText: Thumbprint.sigil.fromHex(draft.identity.id),
						onConfirmed: async() => {
							await situation.onDelete(draft.identity)
							await situation.onBack()
						},
					})
					.children(html`
						<h2 class=delete-heading>Delete "${draft.identity.label}"</h2>
					`)
					.render()}
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

