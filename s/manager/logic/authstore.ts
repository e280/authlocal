
import {Passport} from "../../auth/passport.js"
import {PassportsFileJson} from "../../auth/types.js"
import {storageSignal} from "../../tools/json-storage.js"
import {PassportsFile} from "../../auth/passports-file.js"

export class PassportStore {
	#storage = storageSignal<PassportsFileJson>("authduo_passports")

	#save(passports: PassportsFile) {
		this.#storage.save(passports.toJson())
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

