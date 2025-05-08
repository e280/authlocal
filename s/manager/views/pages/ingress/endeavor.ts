
import {signal} from "@benev/slate"
import {Tabby} from "../../common/tabby/view.js"
import {Problematic} from "../../common/problems/problematic.js"
import {hydrateIdentities, Identity} from "../../../../core/identity.js"

export class IngressEndeavor {
	tabby = new Tabby(0)
	identities = signal<Identity[]>([])
	problematic = new Problematic()

	constructor() {
		this.tabby.on(() => this.clear())
	}

	clear() {
		this.identities.value = []
		this.problematic.clear()
	}

	get validIdentityCount() {
		return this.identities.value.length
	}

	async ingestFiles(files: File[]) {
		this.clear()
		this.tabby.goto(0) // upload tab
		const idents: Identity[] = []

		for (const file of files) {
			await this.problematic.captureProblems(async() => {
				idents.push(...await hydrateIdentities(await file.text()))
			})
		}

		this.identities.value = idents
	}
}

