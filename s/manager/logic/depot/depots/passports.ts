
import {Kv} from "@e280/kv"
import {Passport} from "../../../../core/passport.js"

export class PassportsDepot {
	constructor(public kv: Kv<Passport>) {}

	async list() {
		return await Kv.collect(this.kv.values())
	}

	async save(passport: Passport) {
		await this.kv.put(passport.id, passport)
	}

	async load(id: string) {
		return await this.kv.require(id)
	}

	async delete(id: string) {
		return await this.kv.del(id)
	}

	async wipe() {
		await this.kv.clear()
	}
}

