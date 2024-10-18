
import {hex} from "../../tools/hex.js"

const toHex = hex.from.buffer

export class Accountant {
	async login() {}
}

export class Signatory {
	static async make() {
		const keys = await crypto.subtle.generateKey(
			{name: "ECDSA", namedCurve: "P-256"},
			true,
			["sign", "verify"],
		) as CryptoKeyPair

		const publicHex = toHex(
			await crypto.subtle.exportKey("spki", keys.publicKey)
		)

		return new this(publicHex, keys)
	}

	constructor(
		public publicHex: string,
		keys: CryptoKeyPair,
	) {}
}

