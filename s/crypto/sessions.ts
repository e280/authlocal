
import {Proofs} from "./proofs.js"
import {generateKeypair} from "./core.js"
import {Passport, Proof} from "./concepts.js"
import {ClaimPayload, ProofPayload, Session} from "./concepts.js"
import {Token, TokenParams, TokenVerifications} from "./token.js"

export async function generateSession(passport: Passport, proofTokenParams: TokenParams): Promise<Session> {
	const sessionKeypair = await generateKeypair()
	const proof: Proof = {
		scope: "proof",
		sessionId: sessionKeypair.id,
		passport: {id: passport.id, label: passport.label},
	}
	return {
		secret: sessionKeypair.secret,
		proofToken: await Proofs.sign(passport.secret, proof, proofTokenParams)
	}
}

export async function signClaim<C>(session: Session, claim: C, params: TokenParams) {
	const proof = Token.decode<ProofPayload>(session.proofToken).payload.data
	return Token.sign<ClaimPayload<C>>(session.secret, {
		...Token.params(params),
		sub: proof.passport.id,
		data: {
			claim,
			proofToken: session.proofToken,
		},
	})
}

export async function verifyClaim<C>(claimToken: string, options?: {
		proof?: TokenVerifications
		claim?: TokenVerifications
	}) {
	const pre = Token.decode<ClaimPayload<C>>(claimToken)
	const proof = await Proofs.verify(pre.payload.data.proofToken, options?.proof)
	const payload = await Token.verify<ClaimPayload<C>>(proof.sessionId, claimToken, options?.claim)
	const {claim} = payload.data
	return {claim, proof}
}

