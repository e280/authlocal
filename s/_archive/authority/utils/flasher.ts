
import {debounce} from "@e280/stz"
import {signal} from "@e280/strata"

export type Flash = "none" | "good" | "bad"

export class Flasher {
	#flashing = signal<Flash>("none")
	reset = debounce(300, () => { this.#flashing.value = "none" })

	get flashing() {
		return this.#flashing.value
	}

	async flash(flash: Flash = "good") {
		this.#flashing.value = flash
		this.reset()
	}
}

