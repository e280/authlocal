
import {html, Signal} from "@benev/slate"

import styles from "./styles.js"
import {nexus} from "../../nexus.js"
import {Situation} from "../../situation.js"
import { signalInput } from "../../../tools/signal-input.js"

export const CreateView = nexus.shadowView(use => (
		situation: Situation.Create
	) => {

	use.styles(styles)
	const {identity} = situation

	const name = use.signal(identity.name)

	function done() {
		identity.name = name.value
		situation.onComplete(identity)
	}

	return html`
		<label>
			<span>thumbprint</span>
			<input type=text readonly value="${identity.id}"/>
		</label>

		<label>
			<span>name</span>
			<input type=text value="${name}" @input="${signalInput(name)}"/>
		</label>

		<label>
			<span>public key</span>
			<input type=text readonly value="${identity.keys.public}"/>
		</label>

		<label>
			<span>private key</span>
			<input type=text readonly value="${identity.keys.public}"/>
		</label>

		<button class="based flashy" @click="${situation.onCancel}">Cancel</button>
		<button class="based flashy" @click="${done}">Complete</button>
	`
})

