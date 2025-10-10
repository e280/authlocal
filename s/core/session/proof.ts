
import {Hex} from "@e280/stz"
import {signToken} from "../token/sign.js"
import {tokentime} from "../token/tokentime.js"
import {decodeToken} from "../token/decode.js"
import {verifyToken} from "../token/verify.js"
import {ProofPayload, SignProofOptions, VerifyProofOptions} from "./types.js"

export async function signProof({
		identitySecret,
		expiresAt,
		proof,
		appOrigin,
		authorityOrigin,
	}: SignProofOptions) {

	return signToken<ProofPayload>(identitySecret, {
		jti: Hex.random(32),
		exp: tokentime.at(expiresAt),
		sub: proof.nametag.id,
		aud: appOrigin,
		iss: authorityOrigin,
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

