
import {hex} from "../../tools/hex.js"
import {base64} from "../../tools/base64.js"
import {PubkeyJson, Signed} from "./types.js"
import {CryptoConstants} from "./crypto-constants.js"

export class Pubkey {
	constructor(
		public readonly thumbprint: string,
		public readonly publicKey: CryptoKey,
	) {}

	static async fromJson(json: PubkeyJson) {
		const extractable = true
		const publicBuffer = hex.to.buffer(json.publicKey)

		const thumbprint = hex.from.buffer(
			await crypto.subtle.digest(CryptoConstants.thumbalgo, publicBuffer)
		)

		if (json.thumbprint !== thumbprint)
			throw new Error("incorrect thumbprint")

		const publicKey = await crypto.subtle.importKey(
			CryptoConstants.format.public,
			publicBuffer,
			CryptoConstants.algo,
			extractable,
			["verify"],
		)

		return new this(thumbprint, publicKey)
	}

	async toJson(): Promise<PubkeyJson> {
		const publicBuffer = await crypto.subtle
			.exportKey(CryptoConstants.format.public, this.publicKey)

		const thumbprint = hex.from.buffer(
			await crypto.subtle.digest(CryptoConstants.thumbalgo, publicBuffer)
		)

		return {
			thumbprint,
			publicKey: hex.from.buffer(publicBuffer),
		}
	}

	async verify<P>(signed: Signed) {
		const data = base64.to.buffer(signed.data)
		const signature = base64.to.buffer(signed.signature)
		const valid = await crypto.subtle.verify(CryptoConstants.algo, this.publicKey, signature, data)
		if (valid)
			return JSON.parse(new TextDecoder().decode(data)) as P
		else
			throw new Error("invalid signature")
	}
}

