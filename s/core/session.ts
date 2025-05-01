
import {Passport} from "./passport.js"
import {generateKeypair} from "./crypto.js"
import {Proof, ProofPayload, signProof, verifyProof} from "./proof.js"
import {Token, TokenParams, TokenPayload, TokenVerifications} from "./token.js"

/** a login session */
export type Session = {

	/** private key for a login session */
	secret: string

	/** proof for this session */
	proofToken: string
}

/** token payload for a generic claim signed by a session */
export type ClaimPayload<C> = {
	sub: string
	data: {claim: C, proofToken: string}
} & TokenPayload

export async function generateSession(passport: Passport, proofTokenParams: TokenParams): Promise<Session> {
	const sessionKeypair = await generateKeypair()
	const proof: Proof = {
		scope: "proof",
		sessionId: sessionKeypair.id,
		passport: {id: passport.id, label: passport.label},
	}
	return {
		secret: sessionKeypair.secret,
		proofToken: await signProof(passport.secret, proof, proofTokenParams)
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
	const proof = await verifyProof(pre.payload.data.proofToken, options?.proof)
	const payload = await Token.verify<ClaimPayload<C>>(proof.sessionId, claimToken, options?.claim)
	const {claim} = payload.data
	return {claim, proof}
}

