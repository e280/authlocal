
import {Kv} from "@e280/kv"
import {signal} from "@benev/slate"
import {Seed} from "../../../../core/seed.js"
import {Identity} from "../../../../core/identity.js"

export type Permit = {
	identity: Identity
	seed: string
}

export class IdentitiesDepot {
	permits = signal<Permit[]>([])

	constructor(public kv: Kv<Identity>) {}

	async list() {
		const identities = await Kv.collect(this.kv.values())
		this.permits.value = await Promise.all(identities.map(async identity => ({
			identity,
			seed: await Seed.pack(identity)
		})))
		return identities
	}

	async #refreshAfter<T>(fn: () => Promise<T>) {
		const value = await fn()
		await this.list()
		return value
	}

	async save(...identities: Identity[]) {
		this.#refreshAfter(async() =>
			await this.kv.sets(
				...identities.map(p => [p.id, p] as [string, Identity])
			)
		)
	}

	async load(id: string) {
		return this.#refreshAfter(
			async() => await this.kv.require(id)
		)
	}

	async delete(...ids: string[]) {
		return this.#refreshAfter(
			async() => await this.kv.del(...ids)
		)
	}

	async wipe() {
		return this.#refreshAfter(async() =>
			await this.kv.clear()
		)
	}
}

