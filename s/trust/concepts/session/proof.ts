
import {signToken} from "../token/sign.js"
import {tokenTool} from "../token/tool.js"
import {decodeToken} from "../token/decode.js"
import {verifyToken} from "../token/verify.js"
import {ProofPayload, SignProofOptions, VerifyProofOptions} from "./types.js"

export async function signProof({
		expiresAt,
		proof,
		appOrigin,
		providerOrigin,
		identitySecret,
	}: SignProofOptions) {

	return signToken<ProofPayload>(identitySecret, {
		...tokenTool.params({
			expiresAt,
			issuer: providerOrigin,
			audience: appOrigin,
		}),
		sub: proof.nametag.id,
		data: proof,
	})
}

export async function verifyProof({proofToken, appOrigins, atTime}: VerifyProofOptions) {
	const pre = decodeToken<ProofPayload>(proofToken)
	const {data: proof} = await verifyToken<ProofPayload>(
		pre.payload.data.nametag.id,
		proofToken,
		{atTime, allowedAudiences: appOrigins},
	)
	return proof
}

export function getAppOriginFromProofToken(proofToken: string) {
	const payload = decodeToken<ProofPayload>(proofToken).payload
	const appOrigin = payload.aud
	if (!appOrigin)
		throw new Error(`proof token is missing audience aud`)
	return appOrigin
}

