
import {decodeToken} from "../token/decode.js"
import {verifyToken} from "../token/verify.js"
import {verifyProof} from "../session/proof.js"
import {ProofPayload} from "../session/types.js"
import {ClaimPayload, VerifyClaimOptions} from "./types.js"

export async function verifyClaim<C>({claimToken, appOrigins, allowedAudiences, atTime}: VerifyClaimOptions) {
	const claimPayload = decodeToken<ClaimPayload<C>>(claimToken).payload
	const {proofToken} = claimPayload.data
	const proofPayload = decodeToken<ProofPayload>(proofToken).payload

	if (!claimPayload.iss)
		throw new Error(`claim token is lacking "iss" field`)

	if (!proofPayload.aud)
		throw new Error(`proof token is lacking "aud" field`)

	if (claimPayload.iss !== proofPayload.aud)
		throw new Error(`claim token iss "${claimPayload.iss}" does not match proof token aud "${proofPayload.aud}"`)

	const proof = await verifyProof({proofToken, appOrigins, atTime})

	const {data: {claim}} = await verifyToken<ClaimPayload<C>>(
		proof.sessionId,
		claimToken,
		{
			atTime,

			// claim must have been issued by your app
			allowedIssuers: appOrigins,

			// claim could include aud
			allowedAudiences,
		},
	)

	return {claim, proof, proofToken}
}

