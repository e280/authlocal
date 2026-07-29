
import {happy, Maybe, nay, yay} from "@e280/stz"
import {Proof} from "./types.js"
import {Payload} from "../tok/types.js"
import {tokenTime} from "../tok/token-time.js"
import {verifyToken} from "../tok/verify-token.js"
import {decodeToken} from "../tok/decode-token.js"

export function verifyProof(proofToken: string, options: {
		atTime?: number
		maxAge?: number
		allowedIssuers?: string[]
		allowedAudiences: string[]
		allowedPurposes?: string[]
		allowedScopes?: string[]
	}): Maybe<Proof> {

	const {
		atTime = Date.now(),
		maxAge,
		allowedIssuers,
		allowedAudiences,
		allowedScopes,
		allowedPurposes,
	} = options

	const decoded = decodeToken<Payload<{proof: Proof}>>(proofToken)

	const maybePayload = verifyToken<Payload<{proof: Proof}>>(
		decoded.payload.proof.id,
		proofToken,
		{atTime, allowedIssuers, allowedAudiences},
	)

	if (!maybePayload.yay)
		return maybePayload

	const payload = maybePayload.value
	const {proof} = maybePayload.value

	if (happy(maxAge)) {
		if (!happy(payload.iat)) return nay(`iat required`)
		const issuedAt = tokenTime.toMs(payload.iat)
		const staleAt = issuedAt + maxAge
		if (atTime >= staleAt)
			return nay(`exceeded max age`)
	}
	
	if (allowedPurposes && !allowedPurposes.includes(proof.purpose))
		return nay(`purpose not allowed "${proof.purpose}"`)

	if (allowedScopes && !allowedScopes.includes(proof.scope))
		return nay(`scope not allowed "${proof.scope}"`)

	return yay(proof)
}

