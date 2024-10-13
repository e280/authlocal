
import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Situation} from "../../situation.js"
import {svgSlate} from "../../../tools/svg-slate.js"
import circleKeyIcon from "../../icons/tabler/circle-key.icon.js"

export const ListView = nexus.shadowView(use => (situation: Situation.List) => {
	use.name("list")
	use.styles(styles)

	const {authcore} = situation
	const identities = authcore.list()
	const none = identities.length === 0

	const inner = (fn: () => void) => (event: Event) => {
		event.stopPropagation()
		fn()
	}

	return html`
		<header class=intro>
			${none ? html`
				<h2>Create or upload an identity to login</h2>
			` : html`
				<h2>Choose your login identity</h2>
			`}
		</header>

		${none ? null : html`
			<nav class=identities>
				${identities.map(identity => html`
					<article>
						${svgSlate(circleKeyIcon)}

						<section class=nameplate>
							<h2>${identity.name}</h2>
							<footer>
								<button class=happy @click="${inner(() => console.log("LOGIN!"))}">Login</button>
								<button @click="${inner(() => situation.onEdit(identity))}">Edit</button>
								<button disabled @click="${inner(() => {})}">Download</button>
							</footer>
						</section>

						<section class=details>
							<span class=thumbprint title="${identity.id}">
								${identity.id.slice(0, 8)}
							</span>
							<span>
								2024-10-12
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
			<button disabled>Upload</button>
			<a disabled class=button target="_blank" ?hidden="${none}">Download</a>
		</nav>
	`
})

