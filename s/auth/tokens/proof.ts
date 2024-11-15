
import {Pubkey} from "../pubkey.js"
import {ProofPayload} from "./types.js"
import {JsonWebToken, VerificationOptions} from "../utils/json-web-token.js"

/** associates a login with a passport (signed by the passport) */
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

