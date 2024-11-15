
import {Proof} from "./proof.js"
import {ClaimPayload} from "./types.js"
import {JsonWebToken} from "../utils/json-web-token.js"

/** arbitrary data (signed by the login) */
export class Claim<C> {
	constructor(
		public readonly proof: Proof,
		public readonly token: string,
		public readonly payload: ClaimPayload<C>,
	) {}

	get thumbprint() { return this.payload.sub }
	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get data() { return this.payload.data }

	isExpired() {
		return Date.now() > this.expiry
	}

	static decode<C>(proof: Proof, claimToken: string) {
		return new this(
			proof,
			claimToken,
			JsonWebToken.decode<ClaimPayload<C>>(claimToken).payload,
		)
	}

	static async verify<C>(proof: Proof, claimToken: string) {
		const claim = this.decode<C>(proof, claimToken)
		if (claim.thumbprint !== proof.thumbprint)
			throw new Error(`thumbprint mismatch between claim and proof`)
		const loginPubkey = await proof.getLoginPubkey()
		await loginPubkey.verify(claimToken)
		return claim
	}
}

