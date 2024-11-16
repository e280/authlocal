
import {LoginProof} from "./login-proof.js"
import {LoginClaimPayload} from "./types.js"
import {JsonWebToken} from "../utils/json-web-token.js"

/**
 * Login claim token -- make any verifiable claim on behalf of your user
 *  - contains any arbitrary data, signed by the user's login
 *  - verification of a claim token requires a proof token
 *  - you can send this to any of your services, along with the proof token for verification
 */
export class LoginClaim<C> {
	constructor(
		public readonly proof: LoginProof,
		public readonly token: string,
		public readonly payload: LoginClaimPayload<C>,
	) {}

	get thumbprint() { return this.payload.sub }
	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get data() { return this.payload.data }

	isExpired() {
		return Date.now() > this.expiry
	}

	static decode<C>(proof: LoginProof, claimToken: string) {
		return new this(
			proof,
			claimToken,
			JsonWebToken.decode<LoginClaimPayload<C>>(claimToken).payload,
		)
	}

	static async verify<C>(proof: LoginProof, claimToken: string) {
		const claim = this.decode<C>(proof, claimToken)
		if (claim.thumbprint !== proof.thumbprint)
			throw new Error(`thumbprint mismatch between claim and proof`)
		const loginPubkey = await proof.getLoginPubkey()
		await loginPubkey.verify(claimToken)
		return claim
	}
}

