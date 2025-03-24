
import {signal} from "@benev/slate"

export class StoragePersistence {
	persisted = signal(false)

	async check() {
		const persisted = await navigator.storage.persisted()
		this.persisted.value = persisted
		return persisted
	}

	async request() {
		const persisted = await navigator.storage.persist()
		this.persisted.value = persisted
		return persisted
	}
}

