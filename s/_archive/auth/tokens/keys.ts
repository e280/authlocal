
import {Proof} from "./proof.js"
import {Token} from "../jwt/token.js"
import {Keypair} from "../keypair.js"
import {ClaimPayload, KeysPayload} from "./types.js"
import {TokenParams, TokenVerifyOptions} from "../jwt/types.js"

/**
 * Login keys token -- able to sign login claims for the user
 *  - represents a user's login, signed by the user's passport
 *  - contains an ephemeral login keypair, used for signing claims on behalf of the user
 *  - you may save this token into your app's local storage, to maintain the user's login
 *  - NEVER distribute these login keys anywhere offsite
 *  	- don't even send these login keys to your own services
 *  	- instead, you can distribute the login proof token, available as `loginKeys.proof.token`
 *    - another good idea is to use the login to sign claim tokens via `login.signClaimToken(~)`
 *    - you can put any information into the claim token that you like
 *    - you can send a `claimToken` along with a `proofToken` and your services can verify them with `Claim.verify(~)`
 */
export class Keys {
	constructor(
		public readonly proof: Proof,
		public readonly token: string,
		public readonly payload: KeysPayload,
	) {}

	get name() { return this.payload.data.name }
	get thumbprint() { return this.proof.thumbprint }
	get expiresAt() { return Token.toJsTime(this.payload.exp) }

	isExpired() {
		return Date.now() > this.expiresAt
	}

	static decode(token: string) {
		return Token.decode<KeysPayload>(token)
	}

	static async verify(proof: Proof, keysToken: string, options?: TokenVerifyOptions) {
		const passportPubkey = await proof.getPassportPubkey()
		await passportPubkey.verify(keysToken, options)
		const {payload} = this.decode(keysToken)
		return new this(proof, keysToken, payload)
	}

	async signClaimToken<D>({data, ...requirements}: {data: D} & TokenParams) {
		const sub = this.thumbprint
		const loginKeypair = await Keypair.fromData(this.payload.data.loginKeypair)
		return await loginKeypair.sign<ClaimPayload<D>>({
			...Token.params(requirements),
			sub,
			data,
		})
	}
}

