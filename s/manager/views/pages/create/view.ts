
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"

import {manager} from "../../../context.js"
import {Situation} from "../../../logic/situation.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {PassportDraft} from "../../common/passport-widget/draft.js"
import {PassportWidget} from "../../common/passport-widget/view.js"
import {crushUsername} from "../../../logic/utils/crush-username.js"
import {dehydratePassports, generatePassport} from "../../../../core/passport.js"

export const CreatePage = shadowView(use => (situation: Situation.Create) => {
	use.name("create-page")
	use.styles([themeCss, stylesCss])

	const draft = use.once(() => new PassportDraft(situation.initialPassport))
	const first = situation.passports.length === 0
	const purpose = manager.purpose.value
	const wizard = use.signal<"editor" | "seeder">("editor")
	const finalized = use.signal({
		passport: situation.initialPassport,
		seed: situation.initialPassportSeed,
	})

	const editor = use.once(() => {
		async function reroll() {
			const freshPassport = await generatePassport()
			draft.passport = freshPassport
		}

		async function clickCreate() {
			const passport = draft.getValidEditedPassport()
			if (passport) {
				await situation.onSave(passport)
				const seed = await dehydratePassports([passport])
				finalized.value = {passport, seed}
				wizard.value = "seeder"
			}
		}

		const render = () => {
			return html`
				<div theme-group>
					<h2>
						${purpose.kind === "login" ? html`
							Create a passport for <code theme-login>${purpose.hostname}</code>
						` : (
							first
								? html`Create your first login passport`
								: html`Create a new login passport`
						)}
					</h2>
					<p>The name you choose is public.</p>
				</div>

				${PassportWidget([draft, {editable: true}])}

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
						?disabled="${!draft.getValidEditedPassport()}"
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
			const passport = editor.draft.getValidEditedPassport()
			if (purpose.kind === "login" && passport)
				purpose.onPassport(passport)
		}

		async function clickDone() {
			await editor.reroll()
			wizard.value = "editor"
			situation.onDone()
		}

		function render() {
			const {passport, seed} = finalized.value
			return html`
				<section theme-group class=seed>
					<h2>Save your recovery seed</h2>
					<p>Download or copy it, and keep it safe — if you lose it, it's gone forever.</p>
				</section>

				<section theme-group>
					${SeedReveal([seed, crushUsername(passport.label) + ".authlocal"])}
				</section>

				<footer theme-buttons>
					${purpose.kind === "login" ? html`
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

