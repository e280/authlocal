
import {signal} from "@benev/slate"
import {Passport} from "../../../auth/concepts.js"
import {PassportsFile, PassportsFileData} from "./passports-file.js"
import {StorageSignal, storageSignal} from "../../../tools/storage-signal.js"

export class PassportStore {
	#storage: StorageSignal<PassportsFileData>
	#file = signal<PassportsFile>(new PassportsFile())

	constructor() {
		window.localStorage.removeItem("authduo_passports")
		this.#storage = storageSignal("authlocal_passports")
		this.reload()
	}

	#save(passports: PassportsFile) {
		this.#storage.save(passports.toData())
	}

	async reload() {
		const data = this.#storage.signal.value
		try {
			this.#file.value = data
				? await PassportsFile.fromData(data)
				: new PassportsFile()
		}
		catch (error) {
			console.warn(error)
			console.warn("ignoring invalid passports file, creating a new one")
			this.#file.value = new PassportsFile()
		}
	}

	list() {
		return this.#file.value.list()
	}

	add(...additions: Passport[]) {
		this.#save(this.#file.value.add(...additions))
	}

	delete(...deletions: Passport[]) {
		this.#save(this.#file.value.delete(...deletions))
	}

	deleteAll() {
		this.#save(this.#file.value.deleteAll())
	}
}

