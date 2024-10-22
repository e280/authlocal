
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Purpose} from "../../../logic/purpose.js"
import {whence} from "../../../../tools/whence.js"
import {Passport} from "../../../../auth/passport.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {svgSlate} from "../../../../tools/svg-slate.js"
import {PassportsFile} from "../../../../auth/passports-file.js"
import circleKeyIcon from "../../../../common/icons/tabler/circle-key.icon.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
		purpose: Purpose.Any,
	) => {

	use.styles([themeCss, stylesCss])

	const {passportStore} = situation
	const passports = passportStore.list()
	const passportsFile = new PassportsFile().add(...passports)
	const none = passports.length === 0

	function renderPassport(passport: Passport) {
		const file = new PassportsFile().add(passport)
		return html`
			<article>
				${svgSlate(circleKeyIcon)}

				<section class=nameplate>
					<h2>${passport.name}</h2>
					<footer>
						${purpose.kind === "login" ? html`
							<button class=happy @click="${() => purpose.onLogin(passport)}">Login</button>
						` : null}
						<button @click="${() => situation.onEdit(passport)}">Edit</button>
						<a class=button download="${file.filename()}" href="${file.href()}">Export</a>
					</footer>
				</section>

				<section class=details>
					<span>
						${whence(passport.created)}
					</span>
					<span class=thumbprint title="${passport.thumbprint}">
						${passport.thumbprint.slice(0, 8)}
					</span>
				</section>
			</article>
		`
	}

	return html`
		${(() => {switch (purpose.kind) {

			case "login":
				return html`
					<header class=intro>
						${none
							? html`<h2>Create or import a passport to login</h2>`
							: html`<h2>Choose a passport to login with</h2>`}
					</header>
				`

			case "manage":
				return null
		}})()}

		<nav class=passports ?hidden="${none}">
			${passports.map(renderPassport)}
		</nav>

		<nav class="controls stdbuttons">
			<button class="${none ? "happy" : ""}" @click="${() => situation.onCreate()}">
				New Passport
			</button>

			<button @click="${() => situation.onIngress(undefined)}">
				Import
			</button>

			${passports.length > 1 ? html`
				<a class=button ?disabled="${none}" download="${passportsFile.filename()}" href="${passportsFile.href()}">
					Export All
				</a>
			` : null}
		</nav>
	`
})

