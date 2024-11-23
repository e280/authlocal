
import {Hex} from "@benev/slate"
import {Token} from "./jwt/token.js"
import {PubkeyData} from "./types.js"
import {CryptoConstants} from "./crypto-constants.js"
import {TokenPayload, TokenVerifyOptions, TokenVerifyError} from "./jwt/types.js"

export class Pubkey {
	constructor(
		public readonly thumbprint: string,
		public readonly publicKey: CryptoKey,
	) {}

	static async fromData(data: PubkeyData) {
		const extractable = true
		const publicBuffer = Hex.bytes(data.publicKey).buffer

		const thumbprint = Hex.string(
			new Uint8Array(
				await crypto.subtle.digest(CryptoConstants.algos.thumbprint, publicBuffer)
			)
		)

		if (data.thumbprint !== thumbprint)
			throw new TokenVerifyError("incorrect thumbprint")

		const publicKey = await crypto.subtle.importKey(
			CryptoConstants.formats.public,
			publicBuffer,
			CryptoConstants.algos.generate,
			extractable,
			["verify"],
		)

		return new this(thumbprint, publicKey)
	}

	async toData(): Promise<PubkeyData> {
		const publicBuffer = await crypto.subtle
			.exportKey(CryptoConstants.formats.public, this.publicKey)

		const thumbprint = Hex.string(
			new Uint8Array(
				await crypto.subtle.digest(
					CryptoConstants.algos.thumbprint,
					publicBuffer,
				)
			)
		)

		return {
			thumbprint,
			publicKey: Hex.string(new Uint8Array(publicBuffer)),
		}
	}

	async verify<P extends TokenPayload>(
			token: string,
			options: TokenVerifyOptions = {},
		) {
		return await Token.verify<P>(this.publicKey, token, options)
	}
}

