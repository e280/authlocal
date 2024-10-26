
import {Pubkey} from "../pubkey.js"
import {ProofPayload} from "../types.js"
import {JsonWebToken, VerificationOptions} from "../utils/json-web-token.js"

export class Proof {
	constructor(
		public readonly token: string,
		public readonly payload: ProofPayload,
	) {}

	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get thumbprint() { return this.payload.data.passportPubkey.thumbprint }

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
		const pubkey = await Pubkey.fromJson(proof.payload.data.passportPubkey)
		await pubkey.verify(token, options)
		return proof
	}
}

