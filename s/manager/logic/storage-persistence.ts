
import {signal} from "@benev/slate"

export class StoragePersistence {
	persisted = signal(false)

	async check() {
		return this.persisted.value = await navigator.storage.persisted()
	}

	async request() {
		if (!await this.check())
			return this.persisted.value = await navigator.storage.persist()
	}
}

