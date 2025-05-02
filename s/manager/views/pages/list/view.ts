
import {html, shadowView} from "@benev/slate"

import {manager} from "../../../context.js"
// import {Passport} from "../../../../auth/passport.js"
// import {Situation} from "../../../logic/situation.js"
// import {PassportsFile} from "../../../../auth/passports-file.js"

import {Situation} from "../../../logic/situation.js"
import {Passport, toPlacard} from "../../../../core/passport.js"
import {PassportWidget} from "../../common/passport-widget/view.js"

import stylesCss from "./styles.css.js"
import themeCss from "../../../../common/theme.css.js"
import { PassportDraft } from "../../common/passport-widget/draft.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
	) => {

	use.styles([themeCss, stylesCss])

	const purpose = manager.purpose.value
	const passports = use.signal(situation.passports)
	const clickNew = () => situation.onCreate()

	function renderPassport(passport: Passport) {
		const clickEdit = () => situation.onEdit(passport)

		return html`
			<div class=passport>
				${PassportWidget([new PassportDraft(passport)], {content: html`
					<button class=edit theme-alt=subtle
						@click="${clickEdit}">
						Edit
					</button>

					${purpose.kind === "login" ? html`
						<button theme-login>Login</button>
					` : null}
				`})}
			</div>
		`
	}

	return html`
		<section theme-plate x-purpose="${purpose.kind}">
			<header theme-header>
				${purpose.kind === "login" ? html`
					<h2>Login request from <code>${purpose.hostname}</code></h2>
					<p>You can authorize the login below by pressing "Login"</p>
				` : html`
					<h2>Your login passports</h2>
				`}
			</header>

			<div class=passports>
				${passports.value.map(renderPassport)}
			</div>

			<footer theme-buttons>
				<button>
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

	// const clickNameplate = (passport: Passport) => () => {
	// 	if (purpose.kind === "login")
	// 		purpose.onLogin(passport)
	// 	else
	// 		situation.onEdit(passport)
	// }
	//
	// function renderPassport(passport: Passport) {
	// 	const file = new PassportsFile().add(passport)
	// 	return html`
	// 		<article>
	// 			<div
	// 				x-nameplate
	// 				x-clickable
	// 				x-purpose="${purpose.kind}"
	// 				@click="${clickNameplate(passport)}">
	//
	// 				${svgSlate(userIcon)}
	//
	// 				<h2>${passport.name}</h2>
	//
	// 				${purpose.kind === "login" ? html`
	// 					<button class=login>Login</button>
	// 				` : null}
	// 			</div>
	//
	// 			<div x-details>
	// 				<div x-p1>
	// 					<span>
	// 						${whence(passport.created)}
	// 					</span>
	// 					<span class=thumbprint title="${passport.thumbprint}">
	// 						${renderThumbprint(passport.thumbprint)}
	// 					</span>
	// 				</div>
	// 				<div x-p2>
	// 					<button
	// 						x-alt=subtle
	// 						@click="${() => situation.onEdit(passport)}">
	// 							Edit
	// 					</button>
	// 					<a
	// 						class=button
	// 						x-alt=subtle
	// 						title="${file.filename()}"
	// 						download="${file.filename()}"
	// 						href="${file.href()}">
	// 							Download
	// 					</a>
	// 				</div>
	// 			</div>
	// 		</article>
	// 	`
	// }
})

