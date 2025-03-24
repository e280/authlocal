
import {Proof, ProofPayload} from "./concepts.js"
import {Token, TokenParams, TokenVerifyOptions} from "./jwt.js"

export const Proofs = {

	async sign(passportSecret: string, proof: Proof, options: TokenParams) {
		return Token.sign<ProofPayload>(passportSecret, {
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

