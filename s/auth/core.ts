
import {hex} from "../tools/hex.js"
import {hash} from "../tools/hash.js"
import {AuthKeys, Identity} from "./types.js"
import {storageSignal} from "../tools/json-storage.js"

const toHex = hex.from.buffer

export class Authcore {
	static async generateIdentity(name: string): Promise<Identity> {
		const signature = await crypto.subtle.generateKey(
			{name: "Ed25519"},
			true,
			["sign", "verify"],
		) as CryptoKeyPair

		const cryption = await crypto.subtle.generateKey(
			{name: "X25519"},
			true,
			["deriveKey", "deriveBits"],
		) as CryptoKeyPair

		const keys: AuthKeys = {
			signature: {
				public: toHex(await crypto.subtle.exportKey("spki", signature.publicKey)),
				private: toHex(await crypto.subtle.exportKey("pkcs8", signature.privateKey)),
			},
			cryption: {
				public: toHex(await crypto.subtle.exportKey("spki", cryption.publicKey)),
				private: toHex(await crypto.subtle.exportKey("pkcs8", cryption.privateKey)),
			},
		}

		const id = await hash(keys.signature.public)

		return {version: 0, name, id, keys}
	}

	#identities = storageSignal<Identity[]>("identities")

	list() {
		return this.#identities.signal.value ?? []
	}

	get() {
		const map = new Map<string, Identity>()
		for (const identity of this.list())
			map.set(identity.id, identity)
		return map
	}

	add(...additions: Identity[]) {
		const identities = this.get()
		for (const identity of additions)
			identities.set(identity.id, identity)
		this.#identities.set([...identities.values()])
		return identities
	}

	delete(...deletions: Identity[]) {
		const identities = this.get()
		for (const identity of deletions)
			identities.delete(identity.id)
		this.#identities.set([...identities.values()])
		return identities
	}
}

