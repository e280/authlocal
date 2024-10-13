
import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Purpose} from "../../logic/purpose.js"
import {whence} from "../../../tools/whence.js"
import {Situation} from "../../logic/situation.js"
import {svgSlate} from "../../../tools/svg-slate.js"
import circleKeyIcon from "../../icons/tabler/circle-key.icon.js"

export const ListView = nexus.shadowView(use => (situation: Situation.List, purpose: Purpose.Any) => {
	use.name("list")
	use.styles(styles)

	const {authcore} = situation
	const identities = authcore.list()
	const none = identities.length === 0

	return html`
		${(() => {switch (purpose.kind) {
			case "login": return html`
				<header class=intro>
					${none
						? html`<h2>Create or upload an identity to login</h2>`
						: html`<h2>Choose your login identity</h2>`}
				</header>
			`
			case "manage": return html`
				<header class=intro>
					<h2>Manage your identities</h2>
				</header>
			`
		}})()}

		${none ? null : html`
			<nav class=identities>
				${identities.map(identity => html`
					<article>
						${svgSlate(circleKeyIcon)}

						<section class=nameplate>
							<h2>${identity.name}</h2>
							<footer>
								${purpose.kind === "login" ? html`
									<button class=happy @click="${() => purpose.onLogin(identity)}">Login</button>
								` : null}
								<button @click="${() => situation.onEdit(identity)}">Edit</button>
								<button disabled @click="${() => {}}">Download</button>
							</footer>
						</section>

						<section class=details>
							<span>
								${whence(identity.created)}
							</span>
							<span class=thumbprint title="${identity.thumbprint}">
								${identity.thumbprint.slice(0, 8)}
							</span>
						</section>
					</article>
				`)}
			</nav>
		`}

		<nav class="controls stdbuttons">
			<button class="${none ? "happy" : ""}" @click="${() => situation.onCreate()}">
				New Identity
			</button>

			<button disabled>
				Upload
			</button>

			<a disabled class=button target="_blank" ?hidden="${none}">
				Download
			</a>
		</nav>
	`
})

