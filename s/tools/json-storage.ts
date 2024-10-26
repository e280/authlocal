
import {ev, pubsub} from "@benev/slate"

export class JsonStorage<D> {
	onChangeFromOutside = pubsub<[D | null]>()
	dispose: () => void

	constructor(
			public readonly key: string,
			public readonly storage: Storage = window.localStorage,
		) {

		this.dispose = ev(window, {
			storage: () => this.onChangeFromOutside.publish(this.get()),
		})
	}

	set(data: D) {
		this.storage.setItem(this.key, JSON.stringify(data))
	}

	get(): D | null {
		const string = this.storage.getItem(this.key)
		try {
			return (string)
				? JSON.parse(string)
				: null
		}
		catch {
			return null
		}
	}
}

