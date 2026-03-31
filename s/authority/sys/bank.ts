
import {GMap} from "@e280/stz"
import {RMap} from "@e280/strata"
import {collect, Kv, StorageDriver} from "@e280/kv"

import {Id} from "../../core/index.js"
import {deriveId} from "../../core/cryp/derive-id.js"
import {Identity, IdentityDelegation, IdentityTiming} from "../types.js"

export class Bank {
	static async init() {
		const driver = new StorageDriver(localStorage)
		const kv = new Kv(driver)
		const bank = new Bank(kv.scope("authlocal"))
		await bank.load()
		StorageDriver.onStorageEvent(() => bank.load())
		return bank
	}

	#tables
	#identities = new RMap<Id, Identity>()

	constructor(kv: Kv) {
		this.#tables = {
			identities: kv.scope<Identity>("identities"),
			identityTimings: kv.scope<IdentityTiming>("identityTimings"),
			identityDelegations: kv.scope<IdentityDelegation>("identityDelegations"),
		}
	}

	get identities() {
		return [...this.#identities.values()]
	}

	getIdentity(id: Id) {
		return this.#identities.get(id)
	}

	requireIdentity(id: Id) {
		return this.#identities.require(id)
	}

	async load() {
		const identities = await collect(this.#tables.identities.entries())
		const identityTimings = new GMap(await collect(this.#tables.identityTimings.entries()))
		identities.sort(([aId], [bId]) => {
			const a = identityTimings.get(aId)?.timeLastTouched ?? 0
			const b = identityTimings.get(bId)?.timeLastTouched ?? 0
			return b - a
		})
		this.#identities.clear()
		for (const [id, identity] of identities)
			this.#identities.set(id, identity)
	}

	async setIdentity(identity: Identity) {
		const id = deriveId(identity.root)
		await this.#tables.identities.set(id, identity)
		await this.#touchIdentity(id)
		await this.load()
	}

	async #touchIdentity(id: string) {
		const now = Date.now()
		const timing = await this.#tables.identityTimings.get(id)
			?? {id, timeFirstTouched: now, timeLastTouched: now}
		timing.timeLastTouched = now
		await this.#tables.identityTimings.set(id, timing)
	}
}

