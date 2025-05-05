
import {Kv} from "@e280/kv"
import {signal} from "@benev/slate"
import {dehydratePassports, Passport} from "../../../../core/passport.js"

export type Permit = {
	passport: Passport
	seed: string
}

export class PassportsDepot {
	permits = signal<Permit[]>([])

	constructor(public kv: Kv<Passport>) {}

	async list() {
		const passports = await Kv.collect(this.kv.values())
		this.permits.value = await Promise.all(passports.map(async passport => ({
			passport,
			seed: await dehydratePassports([passport])
		})))
		return passports
	}

	async #refreshAfter<T>(fn: () => Promise<T>) {
		const value = await fn()
		await this.list()
		return value
	}

	async save(...passports: Passport[]) {
		this.#refreshAfter(async() =>
			await this.kv.sets(
				...passports.map(p => [p.id, p] as [string, Passport])
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

