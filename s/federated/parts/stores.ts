
import {Kv, Store} from "@e280/kv"
import {Auth} from "../auth.js"
import {Session} from "../../core/session.js"

export class AuthStores {
	version: Store<number>
	session: Store<Session>

	constructor(private kv: Kv) {
		this.version = kv.store("version")
		this.session = kv.store("session")
	}

	async versionMigration() {
		const storedVersion = await this.version.get()
		if (storedVersion !== Auth.version)
			await this.kv.clear()
	}
}

