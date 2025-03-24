
import {Proof, ProofPayload} from "./concepts.js"
import {Token, TokenParams, TokenVerifications} from "./jwt.js"

export const Proofs = {

	async sign(passportSecret: string, proof: Proof, options: TokenParams) {
		return Token.sign<ProofPayload>(passportSecret, {
			...Token.params(options),
			sub: proof.passportId,
			data: proof,
		})
	},

	async verify(proofToken: string, options?: TokenVerifications) {
		const pre = Token.decode<ProofPayload>(proofToken)
		const {data: proof} = await Token.verify<ProofPayload>(
			pre.payload.data.passportId,
			proofToken,
			options,
		)
		if (proof.scope !== "proof")
			throw new Error("invalid proof token scope")
		return proof
	},
}

