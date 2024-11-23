
import {Proof} from "./proof.js"
import {ClaimPayload} from "./types.js"
import {Token, VerificationOptions} from "./token.js"

/**
 * Login claim token -- make any verifiable claim on behalf of your user
 *  - contains any arbitrary data, signed by the user's login
 *  - verification of a claim token requires a proof token
 *  - you can send this to any of your services, along with the proof token for verification
 */
export class Claim<C> {
	constructor(
		public readonly proof: Proof,
		public readonly token: string,
		public readonly payload: ClaimPayload<C>,
	) {}

	get thumbprint() { return this.payload.sub }
	get expiresAt() { return Token.toJsTime(this.payload.exp) }
	get data() { return this.payload.data }

	isExpired() {
		return Date.now() > this.expiresAt
	}

	static decode<C>(claimToken: string) {
		return Token.decode<ClaimPayload<C>>(claimToken)
	}

	static async verify<C>(proof: Proof, claimToken: string, options: VerificationOptions = {}) {
		const {payload} = this.decode<C>(claimToken)
		const claim = new this(proof, claimToken, payload)

		if (claim.thumbprint !== proof.thumbprint)
			throw new Error(`thumbprint mismatch between claim and proof`)

		const loginPubkey = await proof.getLoginPubkey()
		await loginPubkey.verify(claimToken, options)
		return claim
	}
}

