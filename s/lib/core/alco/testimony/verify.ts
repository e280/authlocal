
import {happy} from "@e280/stz"
import {Payload} from "../../tok/types.js"
import {TokenErr} from "../../errs/token-err.js"
import {verifyProof} from "../proof/verify.js"
import {tokenTime} from "../../tok/token-time.js"
import {decodeToken} from "../../tok/decode-token.js"
import {verifyToken} from "../../tok/verify-token.js"
import {Testimony, TestimonySource} from "./types.js"
import {TestimonyVerifications} from "./verifications.js"

export function verifyTestimony<X>(token: string, options: TestimonyVerifications): Testimony<X> {
	const {
		allowedIssuers,

		atTime = Date.now(),
		maxAge,
		maxProofAge,
		allowedAudiences,
		allowedDelegators,
		allowedPurposes,
		allowedScopes,
	} = options

	type TPay = Payload<{testimony: TestimonySource<X>}>

	const testimonyDecoded = decodeToken<TPay>(token).payload
	const {proofToken} = testimonyDecoded.testimony

	const testimonyIssuedAt = happy(testimonyDecoded.iat)
		? tokenTime.toMs(testimonyDecoded.iat)
		: undefined

	if (!happy(testimonyIssuedAt))
		throw new TokenErr(`testimony iat required`)
	
	const proof = verifyProof(proofToken, {
		maxAge: maxProofAge,
		allowedPurposes,
		allowedScopes,

		// we're checking if the proof was valid *when the testimony was signed*
		atTime: testimonyIssuedAt,
		
		// be wary, these are confusing, mixed point-of-view going on here
		allowedIssuers: allowedDelegators,
		allowedAudiences: allowedIssuers,
	})

	const {testimony} = verifyToken<TPay>(proof.delegateId, token, {
		atTime,
		maxAge,
		allowedAudiences,
	})

	return {proof, data: testimony.data}
}

