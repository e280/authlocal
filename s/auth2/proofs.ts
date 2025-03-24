
import {Token} from "./jwt/token.js"
import {Passport, Proof, ProofPayload} from "./types.js"
import {TokenParams, TokenVerifyOptions} from "./jwt/types.js"

export const Proofs = {

	async sign(passport: Passport, proof: Proof, options: TokenParams) {
		return Token.sign<ProofPayload>(passport.secret, {
			...Token.params(options),
			sub: proof.passportId,
			data: proof,
		})
	},

	async verify(proofToken: string, options?: TokenVerifyOptions) {
		const pre = Token.decode<ProofPayload>(proofToken)
		const {data: proof} = await Token.verify<ProofPayload>(
			pre.payload.data.passportId,
			proofToken,
			options,
		)
		return proof
	},
}

