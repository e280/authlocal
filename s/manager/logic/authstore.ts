
import {Idfile} from "../../auth/idfile.js"
import {IdfileJson} from "../../auth/types.js"
import {Identity} from "../../auth/identity.js"
import {storageSignal} from "../../tools/json-storage.js"

export class Idstore {
	#storage = storageSignal<IdfileJson>("authduo_identities")

	#save(identities: Idfile) {
		this.#storage.save(identities.toJson())
	}

	get idfile() {
		const json = this.#storage.signal.value
		return json
			? Idfile.fromJson(json)
			: new Idfile()
	}

	list() {
		return this.idfile.list()
	}

	add(...additions: Identity[]) {
		this.#save(this.idfile.add(...additions))
	}

	delete(...deletions: Identity[]) {
		this.#save(this.idfile.delete(...deletions))
	}

	deleteAll() {
		this.#save(this.idfile.deleteAll())
	}
}

