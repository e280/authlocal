
import {Token} from "../jwt/token.js"
import {verifyProof} from "../session/proof.js"
import {ProofPayload} from "../session/types.js"
import {ClaimPayload, SignClaimOptions, VerifyClaimOptions} from "./types.js"

export async function signClaim<C>({claim, session, appOrigin, ...params}: SignClaimOptions<C>) {
	const proof = Token.decode<ProofPayload>(session.proofToken).payload.data
	return Token.sign<ClaimPayload<C>>(session.secret, {
		...Token.params({
			...params,

			// issuer must be the app origin
			issuer: appOrigin,
		}),
		sub: proof.nametag.id,
		data: {
			claim,
			proofToken: session.proofToken,
		},
	})
}

export async function verifyClaim<C>({claimToken, appOrigins, atTime}: VerifyClaimOptions) {
	const claimPayload = Token.decode<ClaimPayload<C>>(claimToken).payload
	const {proofToken} = claimPayload.data
	const proofPayload = Token.decode<ProofPayload>(proofToken).payload

	if (!claimPayload.iss)
		throw new Error(`claim token is lacking "iss" field`)

	if (!proofPayload.aud)
		throw new Error(`proof token is lacking "aud" field`)

	if (claimPayload.iss !== proofPayload.aud)
		throw new Error(`claim token iss "${claimPayload.iss}" does not match proof token aud "${proofPayload.aud}"`)

	const proof = await verifyProof({proofToken, appOrigins, atTime})

	const {data: {claim}} = await Token.verify<ClaimPayload<C>>(
		proof.sessionId,
		claimToken,

		// claim must have been issued by your app
		{atTime, allowedIssuers: appOrigins},
	)

	return {claim, proof, proofToken}
}

