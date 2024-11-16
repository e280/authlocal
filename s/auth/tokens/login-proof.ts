
import {Pubkey} from "../pubkey.js"
import {LoginKeys} from "./login-keys.js"
import {LoginClaim} from "./login-claim.js"
import {LoginProofPayload} from "./types.js"
import {Token, VerificationOptions} from "./token.js"

/**
 * Login proof token -- proof that a user is logged in
 *  - proves that a user is logged in, signed by the user's passport
 *  - can verify LoginKeys tokens and LoginClaim tokens
 *  - contains user info, the passport public key, and the login public key
 *  - you can send this around freely to any services that need to know if the user is logged in, or any service that needs to verify any claims you sign with the login keys
 */
export class LoginProof {
	constructor(
		public readonly token: string,
		public readonly payload: LoginProofPayload,
	) {}

	get name() { return this.payload.data.name }
	get expiry() { return Token.toJsTime(this.payload.exp) }
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
		return LoginKeys.verify(this, loginToken)
	}

	async verifyClaim(claimToken: string) {
		return LoginClaim.verify(this, claimToken)
	}

	static decode(token: string) {
		return new this(
			token,
			Token.decode<LoginProofPayload>(token).payload,
		)
	}

	static async verify(token: string, options: {allowedAudiences: string[]} & VerificationOptions) {
		const proof = this.decode(token)
		const passportPubkey = await proof.getPassportPubkey()
		await passportPubkey.verify(token, options)
		return proof
	}
}

