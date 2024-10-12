
import {hex} from "../tools/hex.js"
import {hash} from "../tools/hash.js"
import {Identity, Keypair} from "./types.js"
import {storageSignal} from "../tools/json-storage.js"

const version = 0
const toHex = hex.from.buffer

export class Authcore {
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

		const id = await hash(keys.public)

		return {version, name, id, keys}
	}

	#identities = storageSignal<Identity[]>("identities")

	list() {
		return this.#identities.signal.value ?? []
	}

	#getMap() {
		const map = new Map<string, Identity>()
		for (const identity of this.list())
			map.set(identity.id, identity)
		return map
	}

	add(...additions: Identity[]) {
		const identities = this.#getMap()
		for (const identity of additions)
			identities.set(identity.id, identity)
		this.#identities.set([...identities.values()])
		return identities
	}

	delete(...deletions: Identity[]) {
		const identities = this.#getMap()
		for (const identity of deletions)
			identities.delete(identity.id)
		this.#identities.set([...identities.values()])
		return identities
	}
}

