
import {signal} from "@e280/strata"

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

