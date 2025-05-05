
import {PassportPlacard} from "./passport.js"
import {Token, TokenParams, TokenPayload, TokenVerifications} from "./token.js"

/** proof that a session was signed by the user's passport */
export type Proof = {
	scope: "proof"
	sessionId: string
	passport: PassportPlacard
}

/** token payload that contains proof */
export type ProofPayload = {data: Proof} & TokenPayload

export async function signProof(passportSecret: string, proof: Proof, options: TokenParams) {
	return Token.sign<ProofPayload>(passportSecret, {
		...Token.params(options),
		sub: proof.passport.id,
		data: proof,
	})
}

export async function verifyProof(proofToken: string, options?: TokenVerifications) {
	const pre = Token.decode<ProofPayload>(proofToken)
	const {data: proof} = await Token.verify<ProofPayload>(
		pre.payload.data.passport.id,
		proofToken,
		options,
	)
	if (proof.scope !== "proof")
		throw new Error("invalid proof token scope")
	return proof
}

export function decodeProofPayload(proofToken: string) {
	return Token.decode<ProofPayload>(proofToken).payload
}

