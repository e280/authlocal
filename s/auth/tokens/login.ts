
import {hexId} from "@benev/slate"
import {Proof} from "./proof.js"
import {Keypair} from "../keypair.js"
import {JsonWebToken} from "../utils/json-web-token.js"
import {ClaimPayload, LoginPayload} from "./types.js"

/** contains a login keypair for signing claims (signed by the passport) */
export class Login {
	constructor(
		public readonly proof: Proof,
		public readonly token: string,
		public readonly payload: LoginPayload,
	) {}

	get expiry() { return JsonWebToken.toJsTime(this.payload.exp) }
	get name() { return this.payload.data.name }
	get thumbprint() { return this.proof.thumbprint }

	isExpired() {
		return Date.now() > this.expiry
	}

	static decode(proof: Proof, token: string) {
		const {payload} = JsonWebToken.decode<LoginPayload>(token)
		return new this(proof, token, payload)
	}

	static async verify(proof: Proof, loginToken: string) {
		const passportPubkey = await proof.getPassportPubkey()
		await passportPubkey.verify(loginToken)
		return this.decode(proof, loginToken)
	}

	async signClaimToken<C>({data, expiry}: {
			data: C
			expiry: number
		}) {
		const sub = this.thumbprint
		const exp = JsonWebToken.fromJsTime(expiry)
		const jti = hexId()
		const loginKeypair = await Keypair.fromData(this.payload.data.loginKeypair)
		return await loginKeypair.sign<ClaimPayload<C>>({sub, exp, data, jti})
	}
}

