
import {Proofs} from "./proofs.js"
import {ClaimPayload, Session} from "./types.js"
import {Token, TokenParams, TokenVerifyOptions} from "./jwt.js"

export const Claims = {

	async sign<C>(session: Session, claim: C, params: TokenParams) {
		const proof = await Proofs.verify(session.proofToken)
		return Token.sign<ClaimPayload<C>>(session.secret, {
			...Token.params(params),
			sub: proof.passportId,
			data: {
				claim,
				proofToken: session.proofToken,
			},
		})
	},

	async verify<C>(claimToken: string, options?: {
			proof: TokenVerifyOptions
			claim: TokenVerifyOptions
		}) {
		const pre = Token.decode<ClaimPayload<C>>(claimToken)
		const proof = await Proofs.verify(pre.payload.data.proofToken, options?.proof)
		const payload = await Token.verify<ClaimPayload<C>>(proof.sessionId, claimToken, options?.claim)
		return payload.data
	},
}

