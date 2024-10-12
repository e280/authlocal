
import {html, loading, Op, opSignal} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Authcore} from "../../../auth/core.js"
import {Identity} from "../../../auth/types.js"
import {syllabicName} from "../../../tools/random-names.js"

export const AuthApp = nexus.shadowComponent(use => {
	use.styles(styles)

	const authcore = use.once(() => new Authcore())
	const identities = authcore.list()

	const op = use.once(() => opSignal(Op.ready(undefined)))

	function clickNew() {
		op.load(async() => {
			const name = syllabicName()
			const identity = await Authcore.generateIdentity(name)
			authcore.add(identity)
		})
	}

	function deleteIdentity(identity: Identity) {
		return () => authcore.delete(identity)
	}

	return html`
		${loading.braille(op, () => html`
			<ul>
				${identities.map(identity => html`
					<li>
						<strong>${identity.name}</strong>
						<span title="${identity.id}">${identity.id.slice(0, 8)}</span>
						<button class="based flashy angry" @click="${deleteIdentity(identity)}">delete</button>
					</li>
				`)}
			</ul>
			<button class="based flashy" @click="${clickNew}">
				New Identity
			</button>
		`)}
	`
})

