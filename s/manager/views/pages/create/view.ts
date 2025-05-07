
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../theme.css.js"

import {manager} from "../../../context.js"
import {hostcode} from "../../../utils/hostcode.js"
import {Situation} from "../../../logic/situation.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {IdentityDraft} from "../../common/identity-widget/draft.js"
import {IdentityWidget} from "../../common/identity-widget/view.js"
import {crushUsername} from "../../../../common/utils/crush-username.js"
import {dehydrateIdentities, generateIdentity} from "../../../../core/identity.js"

export const CreatePage = shadowView(use => (situation: Situation.Create) => {
	use.name("create-page")
	use.styles([themeCss, stylesCss])

	const draft = use.once(() => new IdentityDraft(situation.initialIdentity))
	const first = situation.identities.length === 0
	const purpose = manager.purpose.value
	const wizard = use.signal<"editor" | "seeder">("editor")
	const finalized = use.signal({
		identity: situation.initialIdentity,
		seed: situation.initialIdentitySeed,
	})

	const editor = use.once(() => {
		async function reroll() {
			const freshIdentity = await generateIdentity()
			draft.identity = freshIdentity
		}

		async function clickCreate() {
			const identity = draft.getValidEditedIdentity()
			if (identity) {
				await situation.onSave(identity)
				const seed = await dehydrateIdentities(identity)
				finalized.value = {identity: identity, seed}
				wizard.value = "seeder"
			}
		}

		const render = () => {
			return html`
				<div theme-group>
					<h2>
						${purpose.kind === "login"
						? html`Create a identity for ${hostcode(purpose.appOrigin)}`
						: (first
							? html`Create your first login identity`
							: html`Create a new login identity`)}
					</h2>
					<p>The name you choose is public</p>
				</div>

				${IdentityWidget([draft, {editable: true}])}

				<footer theme-buttons>
					${situation.onBack ? html`
						<button theme-button=back @click="${situation.onBack}">
							Cancel
						</button>
					` : null}

					<button theme-button @click="${situation.onIngress}">
						Import
					</button>

					<button theme-button @click="${reroll}">
						Randomize
					</button>

					<button theme-button=happy
						?disabled="${!draft.getValidEditedIdentity()}"
						@click="${clickCreate}">
							Create
					</button>
				</footer>
			`
		}

		return {render, draft, reroll}
	})

	const seeder = use.once(() => {
		function login() {
			const identity = editor.draft.getValidEditedIdentity()
			if (purpose.kind === "login" && identity)
				purpose.onIdentity(identity)
		}

		async function clickDone() {
			await editor.reroll()
			wizard.value = "editor"
			situation.onDone()
		}

		function render() {
			const {identity, seed} = finalized.value
			return html`
				<section theme-group=tight class=seed>
					${purpose.kind === "login"
						? html`<h2>${hostcode(purpose.appOrigin)}</h2>`
						: null}
					<h2>Save your recovery seed</h2>
					<p>
						Keep it safe. Never share it.<br/>
						Only trust authlocal.org with it.
					</p>
				</section>

				<section theme-group>
					${SeedReveal([seed, crushUsername(identity.label) + ".authlocal"])}
				</section>

				<footer theme-buttons>
					${purpose.kind === "login" ? html`
						<button theme-button=back @click="${clickDone}">
							Done
						</button>
						<button theme-button=login @click="${login}">
							Login
						</button>
					` : html`
						<button theme-button=happy @click="${clickDone}">
							Continue
						</button>
					`}
				</footer>
			`
		}

		return {render}
	})

	return html`
		<section theme-plate x-wizard="${wizard.value}">
			${wizard.value === "editor"
				? editor.render()
				: seeder.render()}
		</section>
	`
})

