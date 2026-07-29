
import {happy} from "@e280/stz"
import {consts} from "../../../../consts.js"
import {verifyProof} from "../proof/verify.js"
import {TokenErr} from "../../errs/token-err.js"
import {tokenTime} from "../../tok/token-time.js"
import {decodeToken} from "../../tok/decode-token.js"
import {verifyToken} from "../../tok/verify-token.js"
import {VerifiedClaimPayload} from "./types/verified.js"
import {ClaimVerifications} from "./types/verifications.js"
import {UnverifiedClaimPayload} from "./types/unverified.js"

export function verifyClaim<X>(token: string, options: ClaimVerifications): VerifiedClaimPayload<X> {
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

	const claimDecoded = decodeToken<UnverifiedClaimPayload<X>>(token).payload

	const claimIssuedAt = happy(claimDecoded.iat)
		? tokenTime.toMs(claimDecoded.iat)
		: undefined

	if (!happy(claimIssuedAt))
		throw new TokenErr(`iat required`)
	
	const proof = verifyProof(claimDecoded.proofToken, {
		maxAge: maxProofAge,
		allowedPurposes,
		allowedScopes,

		// we're checking if the proof was valid *when the claim was signed*
		atTime: claimIssuedAt,
		
		// be wary, these are confusing, mixed point-of-view going on here
		allowedIssuers: allowedDelegators,
		allowedAudiences: allowedIssuers,
	})

	const payload = verifyToken<UnverifiedClaimPayload<X>>(proof.delegateId, token, {
		atTime,
		maxAge,
		allowedAudiences,
	})

	return {proof, claim: payload.claim}
}

