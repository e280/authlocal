
import {Nametag} from "./identity.js"
import {Token, TokenPayload} from "./token.js"

/** proof that a session was signed by the user's identity */
export type Proof = {
	sessionId: string
	nametag: Nametag
}

export async function signProof({
		expiresAt,
		proof,
		appOrigin,
		providerOrigin,
		identitySecret,
	}: SignProofOptions) {

	return Token.sign<ProofPayload>(identitySecret, {
		...Token.params({
			expiresAt,
			issuer: providerOrigin,
			audience: appOrigin,
		}),
		sub: proof.nametag.id,
		data: proof,
	})
}

export async function verifyProof({proofToken, appOrigins, atTime}: VerifyProofOptions) {
	const pre = Token.decode<ProofPayload>(proofToken)
	const {data: proof} = await Token.verify<ProofPayload>(
		pre.payload.data.nametag.id,
		proofToken,
		{atTime, allowedAudiences: appOrigins},
	)
	return proof
}

function decodeProofPayload(proofToken: string) {
	return Token.decode<ProofPayload>(proofToken).payload
}

export type SignProofOptions = {
	expiresAt: number
	identitySecret: string
	proof: Proof
	appOrigin: string
	providerOrigin: string
}

export type VerifyProofOptions = {
	proofToken: string
	appOrigins: string[]
	atTime?: number | null
}

/** token payload that contains proof */
export type ProofPayload = {data: Proof} & TokenPayload

export function getAppOriginFromProofToken(proofToken: string) {
	const payload = decodeProofPayload(proofToken)
	const appOrigin = payload.aud
	if (!appOrigin)
		throw new Error(`proof token is missing audience aud`)
	return appOrigin
}

