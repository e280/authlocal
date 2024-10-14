
import {hex} from "../tools/hex.js"
import {hash} from "../tools/hash.js"
import {versions} from "./versions.js"
import {Identity, Keypair} from "./types.js"
import {storageSignal} from "../tools/json-storage.js"

const toHex = hex.from.buffer

export class Authcore {
	#identities = storageSignal<Identity[]>("identities")

	list() {
		return (this.#identities.signal.value ?? []).toReversed()
	}

	#getMap() {
		const map = new Map<string, Identity>()
		for (const identity of this.list())
			map.set(identity.thumbprint, identity)
		return map
	}

	add(...additions: Identity[]) {
		const identities = this.#getMap()
		for (const identity of additions)
			identities.set(identity.thumbprint, identity)
		this.#identities.set([...identities.values()])
		return identities
	}

	delete(...deletions: Identity[]) {
		const identities = this.#getMap()
		for (const identity of deletions)
			identities.delete(identity.thumbprint)
		this.#identities.set([...identities.values()])
		return identities
	}

	static async generateIdentity(name: string): Promise<Identity> {
		const signature = await crypto.subtle.generateKey(
			{name: "Ed25519"},
			true,
			["sign", "verify"],
		) as CryptoKeyPair

		const keys: Keypair = {
			public: toHex(await crypto.subtle.exportKey("spki", signature.publicKey)),
			private: toHex(await crypto.subtle.exportKey("pkcs8", signature.privateKey)),
		}

		const thumbprint = await hash(keys.public)
		const created = Date.now()

		return {version: versions.identity, created, name, thumbprint, keys}
	}
}

