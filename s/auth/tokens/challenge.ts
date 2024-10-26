
import {Proof} from "./proof.js"
import {ChallengePayload} from "./types.js"
import {JsonWebToken} from "../utils/json-web-token.js"

/** arbitrary data (signed by the login) */
export class Challenge<C> {
	constructor(
		public readonly proof: Proof,
		public readonly token: string,
		public readonly payload: ChallengePayload<C>,
	) {}

	get thumbprint() { return this.payload.sub }
	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get data() { return this.payload.data }

	isExpired() {
		return Date.now() > this.expiry
	}

	static decode<C>(proof: Proof, challengeToken: string) {
		return new this(
			proof,
			challengeToken,
			JsonWebToken.decode<ChallengePayload<C>>(challengeToken).payload,
		)
	}

	static async verify<C>(
			proof: Proof,
			challengeToken: string,
		) {
		const challenge = this.decode<C>(proof, challengeToken)
		if (challenge.thumbprint !== proof.thumbprint)
			throw new Error(`thumbprint mismatch between challenge and proof`)
		const loginPubkey = await proof.getLoginPubkey()
		await loginPubkey.verify(challengeToken)
		return challenge
	}
}

