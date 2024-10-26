
import {Proof} from "./proof.js"
import {Keypair} from "../keypair.js"
import {randomId} from "../utils/random-id.js"
import {JsonWebToken} from "../utils/json-web-token.js"
import {ChallengePayload, LoginPayload} from "./types.js"

/** contains a login keypair for signing challenges (signed by the passport) */
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

	async signChallengeToken<C>({data, expiry}: {
			data: C
			expiry: number
		}) {
		const sub = this.thumbprint
		const exp = JsonWebToken.fromJsTime(expiry)
		const jti = await randomId()
		const loginKeypair = await Keypair.fromJson(this.payload.data.loginKeypair)
		return await loginKeypair.sign<ChallengePayload<C>>({sub, exp, data, jti})
	}
}

