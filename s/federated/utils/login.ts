
import {LoginKeys} from "../../auth/tokens/login-keys.js"
import {LoginProof} from "../../auth/tokens/login-proof.js"
import {LoginTokens, LoginVerification} from "../../auth/tokens/types.js"

export class Login {
	constructor(
		public proof: LoginProof,
		public keys: LoginKeys,
	) {}

	static async verify(tokens: LoginTokens, options: LoginVerification) {
		const proof = await LoginProof.verify(tokens.loginProofToken, options)
		const keys = await LoginKeys.verify(proof, tokens.loginKeysToken, options)
		return new this(proof, keys)
	}

	isExpired() { return this.proof.isExpired() }

	get expiresAt() { return this.proof.expiresAt }
	get name() { return this.proof.name }
	get thumbprint() { return this.proof.thumbprint }

	get tokens(): LoginTokens {
		return {
			loginKeysToken: this.keys.token,
			loginProofToken: this.proof.token,
		}
	}
}

