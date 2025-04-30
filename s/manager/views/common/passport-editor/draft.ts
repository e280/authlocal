
import {signal, Signal} from "@benev/slate"
import {Passport} from "../../../../crypto/concepts.js"
import {validLabel} from "../../../logic/passports/utils/validation.js"

export class PassportDraft {
	label: Signal<string>

	constructor(public initial: Passport) {
		this.label = signal(initial.label)
	}

	getValid(): Passport | null {
		return validLabel(this.label.value)
			? {...this.initial, label: this.label.value}
			: null
	}
}

