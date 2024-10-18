
import {Pubkey} from "./pubkey.js"
import {hex} from "../../tools/hex.js"
import {base64} from "../../tools/base64.js"
import {KeypairJson, Signed} from "./types.js"
import {CryptoConstants} from "./crypto-constants.js"

export class Keypair extends Pubkey {
	constructor(
			thumbprint: string,
			publicKey: CryptoKey,
			public readonly privateKey: CryptoKey,
		) {
		super(thumbprint, publicKey)
	}

	static async generate() {
		const keys = await crypto.subtle
			.generateKey(CryptoConstants.algo, true, ["sign", "verify"])

		const publicBuffer = await crypto.subtle
			.exportKey(CryptoConstants.format.public, keys.publicKey)

		const thumbprint = hex.from.buffer(
			await crypto.subtle.digest(CryptoConstants.thumbalgo, publicBuffer)
		)

		return new this(thumbprint, keys.publicKey, keys.privateKey)
	}

	static async fromJson(json: KeypairJson) {
		const pubkey = await Pubkey.fromJson(json)
		const extractable = true
		const privateBuffer = hex.to.buffer(json.privateKey)

		const privateKey = await crypto.subtle.importKey(
			CryptoConstants.format.private,
			privateBuffer,
			CryptoConstants.algo,
			extractable,
			["sign"],
		)

		return new this(pubkey.thumbprint, pubkey.publicKey, privateKey)
	}

	async toJson(): Promise<KeypairJson> {
		const pubkey = await super.toJson()

		const privateBuffer = await crypto.subtle
			.exportKey(CryptoConstants.format.private, this.privateKey)

		return {
			thumbprint: pubkey.thumbprint,
			publicKey: pubkey.publicKey,
			privateKey: hex.from.buffer(privateBuffer),
		}
	}

	async sign<P>(payload: P): Promise<Signed> {
		const data = new TextEncoder().encode(JSON.stringify(payload)).buffer
		const signature = await crypto.subtle.sign(CryptoConstants.algo, this.privateKey, data)
		return {
			data: base64.from.buffer(data),
			signature: base64.from.buffer(signature),
		}
	}
}

