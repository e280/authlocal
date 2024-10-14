
import {html, Signal} from "@benev/slate"
import {whence} from "../../../../../tools/whence.js"
import {Identity} from "../../../../../auth/types.js"
import {signalInput} from "../../../../../tools/signal-input.js"

export function renderEditableName(identity: Identity, name: Signal<string>) {
	return html`
		<label>
			<span>Name</span>
			<input type=text .value="${name.value}" @input="${signalInput(name)}"/>
			<small>
				<span>${whence(identity.created)}</span>
				<span>${identity.thumbprint.slice(0, 8)}</span>
			</small>
		</label>
	`
}

