
import {Token} from "../crypto/token.js"
import { ProofPayload, SignProofOptions, VerifyProofOptions } from "./types.js"

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

export function getAppOriginFromProofToken(proofToken: string) {
	const payload = Token.decode<ProofPayload>(proofToken).payload
	const appOrigin = payload.aud
	if (!appOrigin)
		throw new Error(`proof token is missing audience aud`)
	return appOrigin
}

