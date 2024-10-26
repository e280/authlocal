
import {Proof} from "./proof.js"
import {Pubkey} from "../pubkey.js"
import {AccessPayload} from "../types.js"
import {JsonWebToken, VerificationOptions} from "../utils/json-web-token.js"

export class Access<C> {
	readonly proof: Proof

	constructor(
			public readonly token: string,
			public readonly payload: AccessPayload<C>,
		) {
		this.proof = Proof.decode(payload.data.proofToken)
	}

	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get thumbprint() { return this.proof.thumbprint }
	get data() { return this.payload.data.challenge }

	isExpired() {
		return Date.now() > this.expiry
	}

	static decode<C>(token: string) {
		return new this(
			token,
			JsonWebToken.decode<AccessPayload<C>>(token).payload,
		)
	}

	static async verify<C>(
			token: string,
			options: VerificationOptions = {},
		) {

		const access = this.decode<C>(token)
		const loginPubkey = await Pubkey.fromJson(access.proof.payload.data.loginPubkey)
		const passportPubkey = await Pubkey.fromJson(access.proof.payload.data.passportPubkey)

		await passportPubkey.verify(access.payload.data.proofToken)
		await loginPubkey.verify(token, options)
		return access
	}
}

