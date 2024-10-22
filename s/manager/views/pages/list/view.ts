
import {html, shadowView} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {Purpose} from "../../../logic/purpose.js"
import {whence} from "../../../../tools/whence.js"
import {Situation} from "../../../logic/situation.js"
import themeCss from "../../../../common/theme.css.js"
import {svgSlate} from "../../../../tools/svg-slate.js"
import circleKeyIcon from "../../../../common/icons/tabler/circle-key.icon.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
		purpose: Purpose.Any,
	) => {

	use.styles([themeCss, stylesCss])

	const {passportStore} = situation
	const passports = passportStore.list()
	const none = passports.length === 0

	return html`
		${(() => {switch (purpose.kind) {

			case "login":
				return html`
					<header class=intro>
						${none
							? html`<h2>Create a passport to login</h2>`
							: html`<h2>Choose a passport to login with</h2>`}
					</header>
				`

			case "manage":
				return null
		}})()}

		<nav class=identities ?hidden="${none}">
			${passports.map(passport => html`
				<article>
					${svgSlate(circleKeyIcon)}

					<section class=nameplate>
						<h2>${passport.name}</h2>
						<footer>
							${purpose.kind === "login" ? html`
								<button class=happy @click="${() => purpose.onLogin(passport)}">Login</button>
							` : null}
							<button @click="${() => situation.onEdit(passport)}">Edit</button>
							<button @click="${() => situation.onEgress([passport])}">Export</button>
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
			`)}
		</nav>

		<nav class="controls stdbuttons">
			<button class="${none ? "happy" : ""}" @click="${() => situation.onCreate()}">
				New Passport
			</button>

			<button @click="${() => situation.onIngress(undefined)}">
				Import
			</button>

			<button ?disabled="${none}" @click="${() => situation.onEgress(passports)}">
				Export All
			</button>
		</nav>
	`
})


