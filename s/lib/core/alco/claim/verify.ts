
import {happy} from "@e280/stz"
import {Payload} from "../../tok/types.js"
import {consts} from "../../../../consts.js"
import {Claim, ClaimSource} from "./types.js"
import {verifyProof} from "../proof/verify.js"
import {TokenErr} from "../../errs/token-err.js"
import {tokenTime} from "../../tok/token-time.js"
import {decodeToken} from "../../tok/decode-token.js"
import {verifyToken} from "../../tok/verify-token.js"
import {ClaimVerifications} from "./verifications.js"

export function verifyClaim<X>(token: string, options: ClaimVerifications): Claim<X> {
	const {
		allowedIssuers,

		maxAge,
		allowedAudiences,
		allowedDelegators,
		allowedScopes,
		atTime = Date.now(),
		maxProofAge = consts.standardLifespan,
		allowedPurposes = [consts.purposes.auth],
	} = options

	type CPay = Payload<{claim: ClaimSource<X>}>

	const claimDecoded = decodeToken<CPay>(token).payload
	const {proofToken} = claimDecoded.claim

	const claimIssuedAt = happy(claimDecoded.iat)
		? tokenTime.toMs(claimDecoded.iat)
		: undefined

	if (!happy(claimIssuedAt))
		throw new TokenErr(`iat required`)
	
	const proof = verifyProof(proofToken, {
		maxAge: maxProofAge,
		allowedPurposes,
		allowedScopes,

		// we're checking if the proof was valid *when the claim was signed*
		atTime: claimIssuedAt,
		
		// be wary, these are confusing, mixed point-of-view going on here
		allowedIssuers: allowedDelegators,
		allowedAudiences: allowedIssuers,
	})

	const {claim} = verifyToken<CPay>(proof.delegateId, token, {
		atTime,
		maxAge,
		allowedAudiences,
	})

	return {proof, data: claim.data}
}

