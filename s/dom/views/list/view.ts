

import {html} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Situation} from "../../situation.js"

export const ListView = nexus.shadowView(use => (situation: Situation.List) => {
	use.styles(styles)

	const {authcore} = situation
	const identities = authcore.list()

	return html`
		<ul>
			${identities.map(identity => html`
				<li>
					<strong>${identity.name}</strong>
					<span title="${identity.id}">${identity.id.slice(0, 8)}</span>
					<button class="based flashy angry" @click="${() => situation.onDelete(identity)}">delete</button>
				</li>
			`)}
		</ul>
		<button class="based flashy" @click="${() => situation.onCreate()}">
			New Identity
		</button>
	`
})

