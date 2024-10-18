
import {Identities} from "../../common/auth/identities.js"
import {IdentitiesJson} from "../../common/auth/types.js"
import {storageSignal} from "../../tools/json-storage.js"

export class Authstore extends Identities {
	#storage = storageSignal<IdentitiesJson[]>("authduo_identities")

	load() {}
}

