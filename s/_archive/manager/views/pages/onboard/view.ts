
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {manager} from "../../../context.js"
import {Passport} from "../../../../auth/passport.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {PassportEditor} from "../../common/passport-editor/view.js"

export const OnboardPage = shadowView(use => (situation: Situation.Onboard) => {
	use.styles([themeCss, stylesCss])

	const purpose = manager.purpose.value
	const passport = use.signal<Passport | null>(situation.passport)

	function save() {
		if (passport.value) {
			situation.onSaveNewPassport(passport.value)
			situation.onDone()
		}
	}

	function login() {
		if (purpose.kind === "login" && passport.value) {
			situation.onSaveNewPassport(passport.value)
			purpose.onLogin(passport.value)
		}
	}

	return html`
		<div class=plate>
			<header class=instruction>
				${purpose.kind === "login" ? html`
						<h2>Create a login for <code class=domain>${purpose.hostname}</code></h2>
					` : html`
					<h2>Create your first digital passport</h2>
				`}
			</header>

			${PassportEditor([{
				passport: situation.passport,
				onUpdate: updated => passport.value = updated,
			}])}

			<footer class=buttonbar>
				<button @click="${situation.onIngress}">
					Import Existing
				</button>

				${purpose.kind === "login" ? html`
					<button class=login
						?disabled="${!passport.value}"
						@click="${login}">
							Login
					</button>
				` : html`
					<button class=happy
						?disabled="${!passport.value}"
						@click="${save}">
							Create
					</button>
				`}

			</footer>
		</div>
	`
})

