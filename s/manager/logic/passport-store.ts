
import {Passport} from "../../auth/passport.js"
import {PassportsFileJson} from "../../auth/types.js"
import {PassportsFile} from "../../auth/passports-file.js"
import {storageSignal} from "../../tools/storage-signal.js"

export class PassportStore {
	#storage = storageSignal<PassportsFileJson>("authduo_passports")

	#save(passports: PassportsFile) {
		this.#storage.save(passports.toJson())
	}

	get passportsFile() {
		const json = this.#storage.signal.value
		try {
			return json
				? PassportsFile.fromJson(json)
				: new PassportsFile()
		}
		catch {
			return new PassportsFile()
		}
	}

	list() {
		return this.passportsFile.list()
	}

	add(...additions: Passport[]) {
		this.#save(this.passportsFile.add(...additions))
	}

	delete(...deletions: Passport[]) {
		this.#save(this.passportsFile.delete(...deletions))
	}

	deleteAll() {
		this.#save(this.passportsFile.deleteAll())
	}
}

