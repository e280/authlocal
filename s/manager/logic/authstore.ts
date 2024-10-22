
import {PassportsFile} from "../../auth/idfile.js"
import {PassportsFileJson} from "../../auth/types.js"
import {Passport} from "../../auth/identity.js"
import {storageSignal} from "../../tools/json-storage.js"

export class Idstore {
	#storage = storageSignal<PassportsFileJson>("authduo_identities")

	#save(identities: PassportsFile) {
		this.#storage.save(identities.toJson())
	}

	get idfile() {
		const json = this.#storage.signal.value
		return json
			? PassportsFile.fromJson(json)
			: new PassportsFile()
	}

	list() {
		return this.idfile.list()
	}

	add(...additions: Passport[]) {
		this.#save(this.idfile.add(...additions))
	}

	delete(...deletions: Passport[]) {
		this.#save(this.idfile.delete(...deletions))
	}

	deleteAll() {
		this.#save(this.idfile.deleteAll())
	}
}

