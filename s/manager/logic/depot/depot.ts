
import {Kv} from "@e280/kv"
import {Passport} from "../../../core/passport.js"
import {PassportsDepot} from "./depots/passports.js"

/** local storage facility for authlocal */
export class Depot {
	root: Kv
	passports: PassportsDepot

	constructor(kv: Kv) {
		this.root = kv.namespace("authlocal")

		this.passports = new PassportsDepot(
			this.root.namespace<Passport>("passports")
		)
	}
}

