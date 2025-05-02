
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {manager} from "../../../context.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {SeedReveal} from "../../common/seed-reveal/view.js"
import {PassportEditing, PassportWidget} from "../../common/passport-widget/view.js"
import {dehydratePassports, generatePassport, Passport} from "../../../../core/passport.js"

export const CreatePage = shadowView(use => (situation: Situation.Create) => {
	use.styles([themeCss, stylesCss])

	const first = situation.passports.length === 0
	const purpose = manager.purpose.value
	const wizard = use.signal<"editor" | "seeder">("editor")
	const seed = use.signal(situation.initialPassportSeed)

	const editor = use.once(() => {
		const passport = use.signal<Passport>(situation.initialPassport)
		const passportEditing = use.signal<PassportEditing>({
			label: situation.initialPassport.label,
			valid: true,
		})

		function getEditedPassport(): Passport | undefined {
			return (passport.value && passportEditing.value?.valid)
				? {...passport.value, label: passportEditing.value.label}
				: undefined
		}

		async function reroll() {
			const freshPassport = await generatePassport()
			passport.value = freshPassport
			passportEditing.value = {label: freshPassport.label, valid: true}
		}

		async function clickCreate() {
			const passport = getEditedPassport()
			if (passport) {
				await situation.onSaveNewPassport(passport)
				seed.value = await dehydratePassports([passport])
				wizard.value = "seeder"
			}
		}

		const render = () => {
			const validPassport = editor.getEditedPassport()
			return html`
				<header theme-header>
					${purpose.kind === "login" ? html`
						<h2>Create a new login passport for <code class=domain>${purpose.hostname}</code></h2>
					` : (
						first
							? html`<h2>Create your first login passport</h2>`
							: html`<h2>Create a new login passport</h2>`
					)}
					<p>No emails, no passwords, no databases</p>
				</header>

				${PassportWidget([{
					placard: {id: passport.value.id, label: passport.value.label},
					editing: passportEditing,
				}])}

				<footer theme-buttons>
					${situation.onCancel ? html`
						<button @click="${situation.onCancel}">
							Cancel
						</button>
					` : null}
					<button @click="${situation.onIngress}">
						Import
					</button>
					<button @click="${reroll}">
						Randomize
					</button>
					<button class=happy
						?disabled="${!validPassport}"
						@click="${clickCreate}">
							Create
					</button>
				</footer>
			`
		}

		return {render, getEditedPassport, reroll}
	})

	const seeder = use.once(() => {
		function login() {
			const passport = editor.getEditedPassport()
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
			return html`
				<header theme-header>
					<h2>Save your recovery seed</h2>
					<p>Download or copy it to a safe place — if you lose it, it's gone forever</p>
				</header>

				${SeedReveal([seed.value, 1])}

				<footer theme-buttons>
					${purpose.kind === "login" ? html`
						<button class=login @click="${login}">
							Login
						</button>
					` : html`
						<button class=happy @click="${clickDone}">
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

