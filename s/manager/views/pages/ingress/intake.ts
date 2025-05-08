
import {signal} from "@benev/slate"
import {Tabby} from "../../common/tabby/view.js"
import {hydrateIdentities, Identity} from "../../../../core/identity.js"

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

	async captureProblems<T>(fn: () => Promise<T>) {
		try {
			return await fn()
		}
		catch (error) {
			this.problems.value = [
				(error instanceof Error)
					? `${error.name}: ${error.message}`
					: `invalid`,
			]
		}
	}

	async ingestFiles(files: File[]) {
		this.clear()
		this.tabby.goto(0) // upload tab
		const idents: Identity[] = []

		for (const file of files) {
			await this.captureProblems(async() => {
				idents.push(...await hydrateIdentities(await file.text()))
			})
		}

		this.identities.value = idents
	}

	async ingestSeedText(text: string) {
		this.clear()
		await this.captureProblems(async() => {
			this.identities.value = await hydrateIdentities(text)
			if (text.length > 0 && this.identities.value.length === 0)
				this.problems.value = [...this.problems.value, "No valid seeds detected"]
		})
	}
}

