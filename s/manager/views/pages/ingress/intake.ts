
import {signal} from "@benev/slate"
import {Tabby} from "../../common/tabby/view.js"
import {distinguishOkAndErr, problematize} from "../../../../tools/errors.js"
import {dedupeIdentities, hydrateIdentities, Identity} from "../../../../core/identity.js"

export class Intake {
	tabby = new Tabby(0)
	problems = signal<string[]>([])
	identities = signal<Identity[]>([])

	constructor() {
		this.tabby.on(() => this.clear())
	}

	clear() {
		this.problems.value = []
		this.identities.value = []
	}

	addProblems(...probs: string[]) {
		this.problems.value = [...this.problems.value, ...probs]
	}

	async #hydrate(seedtext: string) {
		const promises = hydrateIdentities(seedtext)
		const {ok, err} = await distinguishOkAndErr(promises)
		this.addProblems(...err.map(problematize))
		return ok
	}

	async ingestFiles(files: File[]) {
		this.clear()
		this.tabby.goto(0) // upload tab
		const identities: Identity[] = []

		for (const file of files) {
			const seedtext = await file.text()
			const idents = await this.#hydrate(seedtext)
			identities.push(...dedupeIdentities(idents))
		}

		this.identities.value = identities
	}

	async ingestSeedText(seedtext: string) {
		this.clear()
		const identities = await this.#hydrate(seedtext)
		this.identities.value = dedupeIdentities(identities)
		if (seedtext.length > 0 && this.identities.value.length === 0)
			this.addProblems("No valid seeds detected")
	}
}

