
import {Keys} from "../../auth/tokens/keys.js"
import {Proof} from "../../auth/tokens/proof.js"
import {LoginTokens, ProofVerification} from "../../auth/tokens/types.js"

export class Login {
	constructor(
		public proof: Proof,
		public keys: Keys,
	) {}

	static async verify(tokens: LoginTokens, options: ProofVerification) {
		const proof = await Proof.verify(tokens.proofToken, options)
		const keys = await Keys.verify(proof, tokens.keysToken, options)
		return new this(proof, keys)
	}

	isExpired() { return this.proof.isExpired() }

	get name() { return this.keys.name }
	get thumbprint() { return this.proof.thumbprint }
	get expiresAt() { return this.proof.expiresAt }

	get tokens(): LoginTokens {
		return {
			keysToken: this.keys.token,
			proofToken: this.proof.token,
		}
	}
}

