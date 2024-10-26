
import {Proof} from "./proof.js"
import {Pubkey} from "../pubkey.js"
import {ChallengePayload} from "./types.js"
import {JsonWebToken, VerificationOptions} from "../utils/json-web-token.js"

export class Challenge<C> {
	constructor(
		public readonly token: string,
		public readonly payload: ChallengePayload<C>,
	) {}

	get thumbprint() { return this.payload.sub }
	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get data() { return this.payload.data }

	isExpired() {
		return Date.now() > this.expiry
	}

	static decode<C>(token: string) {
		return new this(
			token,
			JsonWebToken.decode<ChallengePayload<C>>(token).payload,
		)
	}

	static async verify<C>(
			proof: Proof,
			token: string,
			options: VerificationOptions = {},
		) {
		const challenge = this.decode<C>(token)
		if (challenge.thumbprint !== proof.thumbprint)
			throw new Error(`thumbprint mismatch between challenge and proof`)
		const pubkey = await Pubkey.fromJson(proof.payload.data.loginPubkey)
		await pubkey.verify(token, options)
		return challenge
	}
}

