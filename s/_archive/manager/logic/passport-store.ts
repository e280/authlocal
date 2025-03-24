
import {Passport} from "../../auth/passport.js"
import {PassportsFileData} from "../../auth/types.js"
import {PassportsFile} from "../../auth/passports-file.js"
import {StorageSignal, storageSignal} from "../../tools/storage-signal.js"
import {migrateStorageKeyRename} from "../../tools/migrate-storage-key-rename.js"

export class PassportStore {
	#storage: StorageSignal<PassportsFileData>

	constructor() {
		migrateStorageKeyRename(window.localStorage, "authduo_passports", "authlocal_passports")
		this.#storage = storageSignal("authlocal_passports")
	}

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

