
import {Kv, Store} from "@e280/kv"
import {Session} from "../../../../trust/exports/authority.js"

export class AuthStores {
	version: Store<number>
	session: Store<Session>

	constructor(private kv: Kv) {
		this.version = kv.store("version")
		this.session = kv.store("session")
	}

	async versionMigration(version: number) {
		const storedVersion = await this.version.get() ?? 0
		if (storedVersion !== version) {
			console.log(`auth store version migration from v${storedVersion} to v${version}`)
			await this.kv.clear()
			await this.version.set(version)
		}
	}
}

