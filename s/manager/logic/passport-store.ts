
import {Passport} from "../../auth/passport.js"
import {PassportsFileData} from "../../auth/types.js"
import {PassportsFile} from "../../auth/passports-file.js"
import {storageSignal} from "../../tools/storage-signal.js"

export class PassportStore {
	#storage = storageSignal<PassportsFileData>("authduo_passports")

	#save(passports: PassportsFile) {
		this.#storage.save(passports.toData())
	}

	get passportsFile() {
		const data = this.#storage.signal.value
		try {
			return data
				? PassportsFile.fromData(data)
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

