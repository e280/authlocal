
import {Keys} from "./keys.js"
import {Claim} from "./claim.js"
import {Token} from "./token.js"
import {Pubkey} from "../pubkey.js"
import {ProofPayload, ProofVerification} from "./types.js"

/**
 * Login proof token -- proof that a user is logged in
 *  - proves that a user is logged in, signed by the user's passport
 *  - can verify LoginKeys tokens and LoginClaim tokens
 *  - contains user info, the passport public key, and the login public key
 *  - you can send this around freely to any services that need to know if the user is logged in, or any service that needs to verify any claims you sign with the login keys
 */
export class Proof {
	constructor(
		public readonly token: string,
		public readonly payload: ProofPayload,
	) {}

	get audience() { return this.payload.aud }
	get expiresAt() { return Token.toJsTime(this.payload.exp) }
	get thumbprint() { return this.payload.data.passportPubkey.thumbprint }

	async getPassportPubkey() {
		return await Pubkey.fromData(this.payload.data.passportPubkey)
	}

	async getLoginPubkey() {
		return await Pubkey.fromData(this.payload.data.loginPubkey)
	}

	isExpired() {
		return Date.now() > this.expiresAt
	}

	async verifyLogin(loginToken: string) {
		return Keys.verify(this, loginToken)
	}

	async verifyClaim(claimToken: string) {
		return Claim.verify(this, claimToken)
	}

	static decode(token: string) {
		return new this(
			token,
			Token.decode<ProofPayload>(token).payload,
		)
	}

	static async verify(token: string, options: ProofVerification) {
		const proof = this.decode(token)
		const passportPubkey = await proof.getPassportPubkey()
		await passportPubkey.verify(token, options)
		return proof
	}
}

