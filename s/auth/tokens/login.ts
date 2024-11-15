
import {hexId} from "@benev/slate"
import {Proof} from "./proof.js"
import {Keypair} from "../keypair.js"
import {ClaimPayload, LoginPayload} from "./types.js"
import {JsonWebToken} from "../utils/json-web-token.js"

/**
 * Login token.
 *  - represents a user's login on authduo
 *  - signed by the user's passport
 *  - contains the user's name, and thumbprint, and ephemeral keypair
 *  - the ephemeral keypair can be used for signing claims on behalf of the user
 *  - you may save this token into your app's local storage, to maintain the user's login
 *  - DO NOT distribute this login or login token to any of your services
 *    - instead, use the login to sign claim tokens via `login.signClaimToken(~)`
 *    - you can put any information into the claim token that you like
 *    - you can send a `claimToken` along with a `proofToken` and your services can verify them with `Claim.verify(~)`
 */
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

