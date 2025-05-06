
import {Nametag} from "./identity.js"
import {Token, TokenParams, TokenPayload} from "./token.js"

/** proof that a session was signed by the user's identity */
export type Proof = {
	sessionId: string
	nametag: Nametag
}

/** token payload that contains proof */
export type ProofPayload = {data: Proof} & TokenPayload

export type SignProofOptions = {
	identitySecret: string,
	proof: Proof,
	appOrigin: string
	providerOrigin: string
} & Omit<TokenParams, "issuer" | "audience">

export async function signProof({
		proof,
		appOrigin,
		providerOrigin,
		identitySecret,
		...params
	}: SignProofOptions) {

	return Token.sign<ProofPayload>(identitySecret, {
		...Token.params({...params, issuer: providerOrigin, audience: appOrigin}),
		sub: proof.nametag.id,
		data: proof,
	})
}

export type VerifyProofOptions = {
	proofToken: string
	appOrigins: string[]
}

export async function verifyProof({proofToken, appOrigins}: VerifyProofOptions) {
	const pre = Token.decode<ProofPayload>(proofToken)
	const {data: proof} = await Token.verify<ProofPayload>(
		pre.payload.data.nametag.id,
		proofToken,
		{allowedAudiences: appOrigins},
	)
	return proof
}

export function decodeProofPayload(proofToken: string) {
	return Token.decode<ProofPayload>(proofToken).payload
}

export function getAppOriginFromProofToken(proofToken: string) {
	const payload = decodeProofPayload(proofToken)
	const appOrigin = payload.aud
	if (!appOrigin)
		throw new Error(`proof token is missing audience aud`)
	return appOrigin
}

