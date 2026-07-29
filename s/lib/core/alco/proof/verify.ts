
import {Proof} from "./types.js"
import {Payload} from "../../tok/types.js"
import {TokenErr} from "../../errs/token-err.js"
import {verifyToken} from "../../tok/verify-token.js"
import {decodeToken} from "../../tok/decode-token.js"

export function verifyProof(proofToken: string, options: {
		allowedAudiences: string[]

		atTime?: number
		maxAge?: number
		allowedIssuers?: string[]
		allowedPurposes?: string[]
		allowedScopes?: string[]
	}): Proof {

	const {
		atTime = Date.now(),
		maxAge,
		allowedIssuers,
		allowedAudiences,
		allowedScopes,
		allowedPurposes,
	} = options

	const decoded = decodeToken<Payload<{proof: Proof}>>(proofToken)

	const {proof} = verifyToken<Payload<{proof: Proof}>>(
		decoded.payload.proof.id,
		proofToken,
		{atTime, maxAge, allowedIssuers, allowedAudiences},
	)
	
	if (allowedPurposes && !allowedPurposes.includes(proof.purpose))
		throw new TokenErr(`purpose not allowed "${proof.purpose}"`)

	if (allowedScopes && !allowedScopes.includes(proof.scope))
		throw new TokenErr(`scope not allowed "${proof.scope}"`)

	return proof
}

