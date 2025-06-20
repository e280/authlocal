
import {Kv} from "@e280/kv"
import {Identity} from "../../../trust/exports/authority.js"
import {IdentitiesDepot} from "./depots/identities.js"

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

