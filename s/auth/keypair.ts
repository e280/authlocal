
import {Hex} from "@benev/slate"

import {Pubkey} from "./pubkey.js"
import {Token} from "./jwt/token.js"
import {KeypairData} from "./types.js"
import {Payload} from "./jwt/types.js"
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
			.generateKey(CryptoConstants.algos.generate, true, ["sign", "verify"])

		const publicBuffer = await crypto.subtle
			.exportKey(CryptoConstants.formats.public, keys.publicKey)

		const thumbprint = Hex.string(
			new Uint8Array(
				await crypto.subtle.digest(CryptoConstants.algos.thumbprint, publicBuffer)
			)
		)

		return new this(thumbprint, keys.publicKey, keys.privateKey)
	}

	static async fromData(data: KeypairData) {
		const pubkey = await Pubkey.fromData(data)
		const extractable = true
		const privateBuffer = Hex.bytes(data.privateKey).buffer

		const privateKey = await crypto.subtle.importKey(
			CryptoConstants.formats.private,
			privateBuffer,
			CryptoConstants.algos.generate,
			extractable,
			["sign"],
		)

		return new this(pubkey.thumbprint, pubkey.publicKey, privateKey)
	}

	async toData(): Promise<KeypairData> {
		const pubkey = await super.toData()

		const privateBuffer = await crypto.subtle
			.exportKey(CryptoConstants.formats.private, this.privateKey)

		return {
			thumbprint: pubkey.thumbprint,
			publicKey: pubkey.publicKey,
			privateKey: Hex.string(new Uint8Array(privateBuffer)),
		}
	}

	toPubkey() {
		return new Pubkey(this.thumbprint, this.publicKey)
	}

	async sign<P extends Payload>(payload: P) {
		return await Token.sign<P>(this.privateKey, payload)
	}
}

