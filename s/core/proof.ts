
import {Nametag} from "./identity.js"
import {Token, TokenParams, TokenPayload, TokenVerifications} from "./token.js"

/** proof that a session was signed by the user's identity */
export type Proof = {
	scope: "proof"
	sessionId: string
	nametag: Nametag
}

/** token payload that contains proof */
export type ProofPayload = {data: Proof} & TokenPayload

export async function signProof(identitySecret: string, proof: Proof, options: TokenParams) {
	return Token.sign<ProofPayload>(identitySecret, {
		...Token.params(options),
		sub: proof.nametag.id,
		data: proof,
	})
}

export async function verifyProof(proofToken: string, options?: TokenVerifications) {
	const pre = Token.decode<ProofPayload>(proofToken)
	const {data: proof} = await Token.verify<ProofPayload>(
		pre.payload.data.nametag.id,
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

