
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {manager} from "../../../context.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {PassportDraft} from "../../common/passport-widget/draft.js"
import {PassportWidget} from "../../common/passport-widget/view.js"
import {crushUsername} from "../../../logic/utils/crush-username.js"
import {dehydratePassports, generatePassport} from "../../../../core/passport.js"

export const CreatePage = shadowView(use => (situation: Situation.Create) => {
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
				<div theme-text>
					<h2>
						${purpose.kind === "login" ? html`
							Create a passport for <code theme-login>${purpose.hostname}</code>
						` : (
							first
								? html`Create your first login passport`
								: html`Create a new login passport`
						)}
					</h2>
					<p>No emails, no passwords, no databases</p>
				</div>

				${PassportWidget([draft, {allowEditing: true}])}

				<p>The name you choose is public</p>

				<footer theme-buttons>
					${situation.onCancel ? html`
						<button theme-back @click="${situation.onCancel}">
							Cancel
						</button>
					` : null}

					<button @click="${situation.onIngress}">
						Import
					</button>

					<button @click="${reroll}">
						Randomize
					</button>

					<button theme-happy
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

		function clickDone() {
			situation.onDone()
			editor.reroll()
				.then(() => {
					wizard.value = "editor"
				})
		}

		function render() {
			const {passport, seed} = finalized.value
			return html`
				<div theme-text>
					<h2>Save your recovery seed</h2>
					<p>Download or copy it to a safe place — if you lose it, it's gone forever</p>
				</div>

				${SeedReveal([seed, crushUsername(passport.label) + ".authlocal"])}

				<footer theme-buttons>
					${purpose.kind === "login" ? html`
						<button theme-login @click="${login}">
							Login
						</button>
					` : html`
						<button theme-happy @click="${clickDone}">
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

