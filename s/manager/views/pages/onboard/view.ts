
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {manager} from "../../../context.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {generatePassport} from "../../../../crypto/passports.js"
import {PassportDraft} from "../../common/passport-editor/draft.js"
import {PassportEditor} from "../../common/passport-editor/view.js"

export const OnboardPage = shadowView(use => (situation: Situation.Onboard) => {
	use.styles([themeCss, stylesCss])

	const purpose = manager.purpose.value
	const passportDraft = use.signal<PassportDraft | null>(null)

	async function reroll() {
		const passport = await generatePassport()
		passportDraft.value = new PassportDraft(passport)
	}

	use.once(reroll)

	function getValidPassport() {
		return passportDraft.value?.getValid()
	}

	function save() {
		const passport = getValidPassport()
		if (passport) {
			situation.onSaveNewPassport(passport)
			situation.onDone()
		}
	}

	function login() {
		const passport = getValidPassport()
		if (purpose.kind === "login" && passport) {
			situation.onSaveNewPassport(passport)
			purpose.onPassport(passport)
		}
	}

	const validPassport = getValidPassport()

	return html`
		<div class=plate>
			<header class=instruction>
				${purpose.kind === "login" ? html`
						<h2>Create a login for <code class=domain>${purpose.hostname}</code></h2>
					` : html`
					<h2>Create your first digital passport</h2>
				`}
			</header>

			${passportDraft.value && PassportEditor([passportDraft.value])}

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

