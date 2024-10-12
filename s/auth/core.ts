
import {hex} from "../tools/hex.js"
import {Identity} from "./types.js"
import {storageSignal} from "../tools/json-storage.js"

export class Authcore {
	static async generateIdentity(name: string): Promise<Identity> {
		const keys = await crypto.subtle.generateKey(
			{name: "ECDSA", namedCurve: "P-256"},
			true,
			["sign", "verify"],
		)

		const privateKey = await crypto.subtle.exportKey("pkcs8", keys.privateKey)
		const publicKey = await crypto.subtle.exportKey("spki", keys.publicKey)

		return {
			name,
			publicKey: hex.from.buffer(publicKey),
			privateKey: hex.from.buffer(privateKey),
		}
	}

	#identities = storageSignal<Identity[]>("identities")

	get() {
		const array = this.#identities.signal.value ?? []
		const map = new Map<string, Identity>()
		for (const identity of array)
			map.set(identity.publicKey, identity)
		return map
	}

	add(...additions: Identity[]) {
		const identities = this.get()
		for (const identity of additions)
			identities.set(identity.publicKey, identity)
		this.#identities.set([...identities.values()])
		return identities
	}

	delete(...deletions: Identity[]) {
		const identities = this.get()
		for (const identity of deletions)
			identities.delete(identity.publicKey)
		this.#identities.set([...identities.values()])
		return identities
	}
}

