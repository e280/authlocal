
import {Signal, signal} from "@benev/slate"
import {Passport} from "../../../../core/passport.js"
import { validLabel } from "../../../logic/utils/validation.js"

export class PassportDraft {
	#passport: Signal<Passport>
	#label: Signal<string>

	constructor(passport: Passport) {
		this.#passport = signal(passport)
		this.#label = signal(passport.label)
	}

	get passport() {
		return this.#passport.value
	}

	set passport(fresh: Passport) {
		this.#passport.value = fresh
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
		const changed = label !== this.passport.label
		return changed && validLabel(label)
	}

	getValidEditedPassport() {
		const label = this.getEditedLabel()
		return validLabel(label)
			? {
				label,
				id: this.#passport.value.id,
				secret: this.#passport.value.id,
			}
			: null
	}
}

