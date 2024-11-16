
import {Keys} from "../../auth/tokens/login-keys.js"
import {Proof} from "../../auth/tokens/login-proof.js"
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

	get expiresAt() { return this.proof.expiresAt }
	get name() { return this.proof.name }
	get thumbprint() { return this.proof.thumbprint }

	get tokens(): LoginTokens {
		return {
			keysToken: this.keys.token,
			proofToken: this.proof.token,
		}
	}
}

