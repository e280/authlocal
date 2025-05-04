
import {Kv} from "@e280/kv"
import {Passport} from "../../../../core/passport.js"

export class PassportsDepot {
	constructor(public kv: Kv<Passport>) {}

	async list() {
		return await Kv.collect(this.kv.values())
	}

	async save(...passports: Passport[]) {
		await this.kv.puts(
			...passports.map(p => [p.id, p] as [string, Passport])
		)
	}

	async load(id: string) {
		return await this.kv.require(id)
	}

	async delete(...ids: string[]) {
		return await this.kv.del(...ids)
	}

	async wipe() {
		await this.kv.clear()
	}
}

