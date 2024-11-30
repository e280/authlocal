
import {html, shadowView, svgSlate} from "@benev/slate"

import stylesCss from "./styles.css.js"
import {manager} from "../../../context.js"
import {whence} from "../../../../tools/whence.js"
import {Passport} from "../../../../auth/passport.js"
import {Situation} from "../../../logic/situation.js"
import {PassportsFile} from "../../../../auth/passports-file.js"

import themeCss from "../../../../common/theme.css.js"
import {IdView} from "../../../../common/views/id/view.js"
import userIcon from "../../../../common/icons/tabler/user.icon.js"

export const ListPage = shadowView(use => (
		situation: Situation.List,
	) => {

	use.styles([themeCss, stylesCss])

	const {passportStore} = situation
	const passports = passportStore.list()
	const passportsFile = new PassportsFile().add(...passports)
	const none = passports.length === 0
	const purpose = manager.purpose.value

	const triggerLogin = (passport: Passport) => () => {
		if (purpose.kind === "login")
			purpose.onLogin(passport)
	}

	function renderPassport(passport: Passport) {
		const file = new PassportsFile().add(passport)
		return html`
			<article>

				<div x-nameplate x-purpose="${purpose.kind}" @click="${triggerLogin(passport)}">
					${svgSlate(userIcon)}

					<h2>${passport.name}</h2>

					${purpose.kind === "login" ? html`
						<button class=login>Login</button>
					` : null}
				</div>

				<div x-details>
					<div x-p1>
						<span>
							${whence(passport.created)}
						</span>
						<span class=thumbprint title="${passport.thumbprint}">
							${IdView([passport.thumbprint])}
						</span>
					</div>
					<div x-p2>
						<button
							x-alt=subtle
							@click="${() => situation.onEdit(passport)}">
								Edit
						</button>
						<a
							class=button
							x-alt=subtle
							title="${file.filename()}"
							download="${file.filename()}"
							href="${file.href()}">
								Download
						</a>
					</div>
				</div>
			</article>
		`
	}

	return html`
		<div class=plate>
			${purpose.kind === "login" ? html`
				<header class="intro instruction">
					${none
						? html`<h2>Create or import a passport for <code class=domain>${purpose.hostname}</code></h2>`
						: html`<h2>Choose your login for <code class=domain>${purpose.hostname}</code></h2>`}
				</header>
			` : null}

			<nav class=passports ?hidden="${none}">
				${passports.map(renderPassport)}
			</nav>

			<nav class="buttonbar">
				<button class="${none ? "happy" : ""}" @click="${() => situation.onCreate()}">
					New Passport
				</button>

				<button @click="${() => situation.onIngress(undefined)}">
					Import
				</button>

				${passports.length > 1 ? html`
					<a
						class=button
						title="${passportsFile.filename()}"
						download="${passportsFile.filename()}"
						href="${passportsFile.href()}">
						Download All
					</a>
				` : null}
			</nav>
		</div>
	`
})

