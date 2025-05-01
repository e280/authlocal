
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {manager} from "../../../context.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {generatePassport, Passport} from "../../../../core/passport.js"
import {PassportEditing, PassportWidget} from "../../common/passport-widget/view.js"

export const OnboardPage = shadowView(use => (situation: Situation.Onboard) => {
	use.styles([themeCss, stylesCss])

	const purpose = manager.purpose.value
	const passport = use.signal<Passport>(situation.initialPassport)
	const passportEditing = use.signal<PassportEditing>({
		label: situation.initialPassport.label,
		valid: true,
	})

	async function reroll() {
		const freshPassport = await generatePassport()
		passport.value = freshPassport
		passportEditing.value = {label: freshPassport.label, valid: true}
	}

	use.once(reroll)

	function getEditedPassport(): Passport | undefined {
		return (passport.value && passportEditing.value?.valid)
			? {...passport.value, label: passportEditing.value.label}
			: undefined
	}

	function save() {
		const passport = getEditedPassport()
		if (passport) {
			situation.onSaveNewPassport(passport)
			situation.onDone()
		}
	}

	function login() {
		const passport = getEditedPassport()
		if (purpose.kind === "login" && passport) {
			situation.onSaveNewPassport(passport)
			purpose.onPassport(passport)
		}
	}

	const validPassport = getEditedPassport()

	return html`
		<div class=plate>
			<header class=instruction>
				${purpose.kind === "login" ? html`
						<h2>Create a login for <code class=domain>${purpose.hostname}</code></h2>
					` : html`
					<h2>Create your first digital passport</h2>
				`}
			</header>

			${PassportWidget([{
				placard: {id: passport.value.id, label: passport.value.label},
				editing: passportEditing,
			}])}

			<footer class=buttonbar>
				<button @click="${situation.onIngress}">
					Import Existing
				</button>

				<button @click="${reroll}">
					Reroll
				</button>

				${purpose.kind === "login" ? html`
					<button class=login
						?disabled="${!validPassport}"
						@click="${login}">
							Login
					</button>
				` : html`
					<button class=happy
						?disabled="${!validPassport}"
						@click="${save}">
							Create
					</button>
				`}

			</footer>
		</div>
	`
})

