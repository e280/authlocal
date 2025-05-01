
import {html, shadowView, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {whence} from "../../../../tools/whence.js"

import {manager} from "../../../context.js"
// import {Passport} from "../../../../auth/passport.js"
// import {Situation} from "../../../logic/situation.js"
// import {PassportsFile} from "../../../../auth/passports-file.js"

import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {Passport} from "../../../../core/passport.js"
import {PassportWidget} from "../../common/passport-widget/view.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
	) => {

	use.styles([themeCss, stylesCss])

	const purpose = manager.purpose.value
	const passports = use.signal(situation.passports)
	const none = passports.value.length === 0

	async function clickNew() {
		situation.onCreate()
	}

	function renderPassport({id, label}: Passport) {
		return PassportWidget([{
			placard: {id, label},
			editing: undefined,
		}])
	}

	return html`
		<section theme-plate>
			<header theme-header>
				<h2>Manage your digital passports</h2>
			</header>

			<div class=passports>
				${passports.value.map(renderPassport)}
			</div>

			<footer theme-buttons>
				<button class=happy @click="${clickNew}">
					New Passport
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

