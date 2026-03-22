
import {signal} from "@e280/strata"
import {Identity} from "./types.js"

export class Bank {
	$identities = signal<Identity[]>([])

	async addIdentity(identity: Identity) {
		await this.$identities([identity, ...this.$identities()])
	}
}

