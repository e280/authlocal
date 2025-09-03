
import {signal, Signal} from "@e280/strata"
import {Identity} from "../../../../trust/exports/authority.js"
import {validLabel} from "../../../../common/utils/validation.js"

export class IdentityDraft {
	#identity: Signal<Identity>
	#label: Signal<string>

	constructor(identity: Identity) {
		this.#identity = signal(identity)
		this.#label = signal(identity.label)
	}

	get identity() {
		return this.#identity.value
	}

	set identity(fresh: Identity) {
		this.#identity.value = fresh
		this.#label.value = fresh.label
	}

	setEditedLabel(label: string) {
		this.#label.value = label
	}

	getEditedLabel() {
		return this.#label.value
	}

	hasValidChanges() {
		const label = this.getEditedLabel()
		const changed = label !== this.identity.label
		return changed && validLabel(label)
	}

	getValidEditedIdentity() {
		const label = this.getEditedLabel()
		return validLabel(label)
			? {
				label,
				id: this.#identity.value.id,
				secret: this.#identity.value.secret,
			}
			: null
	}
}

