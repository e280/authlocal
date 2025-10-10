
import {Kv} from "@e280/kv"
import {IdentitiesDepot} from "./depots/identities.js"
import {Identity} from "../../../core/identity/types.js"

/** local storage facility for authlocal */
export class Depot {
	root: Kv
	identities: IdentitiesDepot

	constructor(kv: Kv) {
		this.root = kv.scope("authlocal")

		this.identities = new IdentitiesDepot(
			this.root.scope<Identity>("identities")
		)
	}
}

