
import {Identity} from "../../common/auth/identity.js"
import {IdentitiesJson} from "../../common/auth/types.js"
import {storageSignal} from "../../tools/json-storage.js"
import {Identities} from "../../common/auth/identities.js"

export class Authstore {
	#storage = storageSignal<IdentitiesJson>("authduo_identities")

	#save(identities: Identities) {
		this.#storage.save(identities.toJson())
	}

	get identities() {
		const json = this.#storage.signal.value
		return json
			? Identities.fromJson(json)
			: new Identities()
	}

	add(...additions: Identity[]) {
		this.#save(this.identities.add(...additions))
	}

	delete(...deletions: Identity[]) {
		this.#save(this.identities.delete(...deletions))
	}

	deleteAll() {
		this.#save(this.identities.deleteAll())
	}
}

