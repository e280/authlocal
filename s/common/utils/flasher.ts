
import {debounce} from "@e280/stz"
import {signal} from "@benev/slate"

export class Flasher {
	status = signal<"none" | "good" | "bad">("none")
	reset = debounce(300, () => { this.status.value = "none" })

	async flash(good = true) {
		this.status.value = good
			? "good"
			: "bad"
		this.reset()
	}
}

