
import {signal} from "@e280/strata"
import {collect, Kv, StorageDriver} from "@e280/kv"
import {Identity} from "../types.js"
import {deriveId} from "../../core/cryp/derive-id.js"

export class Bank {
	static async init() {
		const driver = new StorageDriver(localStorage)
		const kv = new Kv(driver)
		const bank = new Bank(kv.scope("authlocal"))
		await bank.load()
		StorageDriver.onStorageEvent(() => bank.load())
		return bank
	}

	#kvIdentities
	$identities = signal<Identity[]>([])

	constructor(kv: Kv) {
		this.#kvIdentities = kv.scope<Identity>("identities")
	}

	async load() {
		this.$identities(await collect(this.#kvIdentities.values()))
	}

	async addIdentity(identity: Identity) {
		const id = deriveId(identity.root)
		await this.#kvIdentities.set(id, identity)
		await this.load()
	}
}

