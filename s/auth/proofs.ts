
import {Proof, ProofPayload} from "./concepts.js"
import {Token, TokenParams, TokenVerifications} from "./token.js"

export const Proofs = {

	async sign(passportSecret: string, proof: Proof, options: TokenParams) {
		return Token.sign<ProofPayload>(passportSecret, {
			...Token.params(options),
			sub: proof.passport.id,
			data: proof,
		})
	},

	async verify(proofToken: string, options?: TokenVerifications) {
		const pre = Token.decode<ProofPayload>(proofToken)
		const {data: proof} = await Token.verify<ProofPayload>(
			pre.payload.data.passport.id,
			proofToken,
			options,
		)
		if (proof.scope !== "proof")
			throw new Error("invalid proof token scope")
		return proof
	},

	decode(proofToken: string) {
		return Token.decode<ProofPayload>(proofToken).payload.data
	},
}

