
import {Login} from "./login.js"
import {Claim} from "./claim.js"
import {Pubkey} from "../pubkey.js"
import {ProofPayload} from "./types.js"
import {JsonWebToken, VerificationOptions} from "../utils/json-web-token.js"

/**
 * Proof token.
 *  - proves that a user is logged in
 *  - signed by the user's authduo passport
 *  - can verify login tokens, and claim tokens
 *  - contains the user's thumbprint, the passport public key, and login public key
 *  - you can send this to any services that need to know if the user is logged in, or any service that needs to verify any claims you sign with the login
 */
export class Proof {
	constructor(
		public readonly token: string,
		public readonly payload: ProofPayload,
	) {}

	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get thumbprint() { return this.payload.data.passportPubkey.thumbprint }

	async getPassportPubkey() {
		return await Pubkey.fromData(this.payload.data.passportPubkey)
	}

	async getLoginPubkey() {
		return await Pubkey.fromData(this.payload.data.loginPubkey)
	}

	isExpired() {
		return Date.now() > this.expiry
	}

	async verifyLogin(loginToken: string) {
		return Login.verify(this, loginToken)
	}

	async verifyClaim(claimToken: string) {
		return Claim.verify(this, claimToken)
	}

	static decode(token: string) {
		return new this(
			token,
			JsonWebToken.decode<ProofPayload>(token).payload,
		)
	}

	static async verify(token: string, options: VerificationOptions = {}) {
		const proof = this.decode(token)
		const passportPubkey = await proof.getPassportPubkey()
		await passportPubkey.verify(token, options)
		return proof
	}
}

