
import {Proof} from "./proof.js"
import {Pubkey} from "../pubkey.js"
import {Keypair} from "../keypair.js"
import {ChallengePayload, LoginPayload} from "../types.js"
import {JsonWebToken, VerificationOptions} from "../utils/json-web-token.js"

export class Login {
	readonly proof: Proof

	constructor(
			public readonly token: string,
			public readonly payload: LoginPayload,
		) {
		this.proof = Proof.decode(payload.data.proofToken)
	}

	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get name() { return this.payload.data.name }
	get thumbprint() { return this.payload.data.passportPubkey.thumbprint }
	get proofToken() { return this.payload.data.proofToken }

	isExpired() {
		return Date.now() > this.expiry
	}

	static decode(token: string) {
		return new this(
			token,
			JsonWebToken.decode<LoginPayload>(token).payload,
		)
	}

	static async verify(token: string, options: VerificationOptions = {}) {
		const login = this.decode(token)
		const pubkey = await Pubkey.fromJson(login.payload.data.passportPubkey)
		await pubkey.verify(token, options)
		await pubkey.verify(login.proofToken, options)
		return login
	}

	async signChallengeToken<C>({data, expiry}: {
			data: C
			expiry: number
		}) {
		const exp = JsonWebToken.fromJsTime(expiry)
		const loginKeypair = await Keypair.fromJson(this.payload.data.loginKeypair)
		return await loginKeypair.sign<ChallengePayload<C>>({exp, data})
	}
}

