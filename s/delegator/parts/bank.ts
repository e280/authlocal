
import {RMap} from "@e280/strata"
import {collect, hex, need} from "@e280/stz"
import {Kv, IdbMagazine, idbOpen} from "@e280/kv"

import {Id} from "../../lib/core/index.js"
import {deriveId} from "../../lib/core/cryp/derive-id.js"
import {Identity, DelegationRecord, IdentityTiming} from "../types.js"

export class Bank {
	static async init() {
		const channel = new BroadcastChannel("authlocal_bank_change")
		const idb = await idbOpen("authlocal")
		const magazine = new IdbMagazine(idb)
		const kv = new Kv(magazine)
		const bank = new Bank(kv, () => channel.postMessage(Date.now()))
		await bank.load()
		channel.onmessage = () => bank.load()
		return bank
	}

	#tables
	#onChange
	#identities = new RMap<Id, Identity>()

	constructor(kv: Kv, onChange: () => void) {
		this.#onChange = onChange
		this.#tables = {
			kv,
			identities: kv.scope<Identity>("identities"),
			identityTimings: kv.scope<IdentityTiming>("identityTimings"),
			delegations: kv.scope<DelegationRecord>("delegations"),
		}
	}

	get identities() {
		return [...this.#identities.values()]
	}

	getIdentity(id: Id) {
		return this.#identities.get(id)
	}

	requireIdentity(id: Id) {
		return need(this.#identities, id)
	}

	async load() {
		const identities = await collect(this.#tables.identities.entries())
		const identityTimings = new Map(await collect(this.#tables.identityTimings.entries()))
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
		const newTiming = await this.#touchIdentity(id)
		await this.#tables.kv.commit([
			this.#tables.identities.op.set(id, identity),
			this.#tables.identityTimings.op.set(id, newTiming)
		])
		this.#onChange()
		await this.load()
	}

	async recordDelegationEvent(delegation: DelegationRecord) {
		const timestamp = delegation.time.toString().padStart(14, "0")
		const key = `${timestamp}-${hex.random(8)}`
		await this.#tables.delegations.set(key, delegation)
		this.#onChange()
	}

	async deleteIdentity(id: Id) {
		await this.#tables.kv.commit([
			this.#tables.identities.op.delete(id),
			this.#tables.identityTimings.op.delete(id),
			this.#tables.delegations.op.delete(id),
		])
		this.#onChange()
		await this.load()
	}

	async #touchIdentity(id: string) {
		const now = Date.now()
		const timing = await this.#tables.identityTimings.get(id)
			?? {id, timeFirstTouched: now, timeLastTouched: now}
		timing.timeLastTouched = now
		return timing
	}
}

