
import {html, shadowView} from "@benev/slate"

import {manager} from "../../../context.js"

import {Situation} from "../../../logic/situation.js"
import {Passport} from "../../../../core/passport.js"
import {PassportWidget} from "../../common/passport-widget/view.js"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import {PassportDraft} from "../../common/passport-widget/draft.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
	) => {

	use.styles([themeCss, stylesCss])

	const purpose = manager.purpose.value
	const passports = use.signal(situation.passports)
	const clickNew = () => situation.onCreate()

	function renderPassport(passport: Passport) {
		const clickEdit = () => situation.onEdit(passport)
		return PassportWidget([new PassportDraft(passport)], {content: html`
			<button class=edit
				@click="${clickEdit}">
				Edit
			</button>

			${purpose.kind === "login" ? html`
				<button class=login theme-login>Login</button>
			` : null}
		`})
	}

	return html`
		<section theme-plate x-purpose="${purpose.kind}">
			<div theme-group>
				<h2>
					${purpose.kind === "login"
						? html`Login request from <code theme-login>${purpose.hostname}</code>`
						: html`Your login passports`}
				</h2>
				${purpose.kind === "login"
					? html`<p>You can authorize the login below by pressing "Login"</p>`
					: null}
			</div>

			<div class=passports>
				${passports.value.map(renderPassport)}
			</div>

			<footer theme-buttons>
				<button theme-angry>
					Wipe
				</button>

				<button>
					Import
				</button>

				<button theme-happy @click="${clickNew}">
					New
				</button>
			</footer>
		</section>
	`
})

