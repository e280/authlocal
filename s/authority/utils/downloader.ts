
import {Flasher} from "./flasher.js"

export class Downloader extends Flasher {
	#oldUrl: string | undefined

	constructor(public text: string) {
		super()
	}

	get url() {

		// dispose previous object url
		if (this.#oldUrl) URL.revokeObjectURL(this.#oldUrl)

		// generate new object url
		const blob = new Blob([`\n${this.text}\n\n`], {type: "text/plain"})
		const url = URL.createObjectURL(blob)

		this.#oldUrl = url
		return url
	}
}

