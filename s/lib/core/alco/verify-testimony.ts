
import {happy, Maybe, nay, yay} from "@e280/stz"
import {Payload} from "../tok/types.js"
import {verifyProof} from "./verify-proof.js"
import {tokenTime} from "../tok/token-time.js"
import {checkFresh} from "./utils/check-fresh.js"
import {decodeToken} from "../tok/decode-token.js"
import {verifyToken} from "../tok/verify-token.js"
import {Proof, Testimony, TestimonySource} from "./types.js"

export function verifyTestimony<X>(token: string, options: {

		/** js time of verification time (for comparison with expiry) */
		atTime?: number

		/** maximum age of the testimony token */
		maxAge?: number

		/** maximum age of the proof token */
		maxProofAge?: number

		/** app origins authorized to use the delegate */
		allowedIssuers: string[]

		/** intended recipients of this testimony */
		allowedAudiences: string[]

		/** delegators like "https://authlocal.org" */
		allowedDelegators?: string[]

		/** delegate purposes like "auth" */
		allowedPurposes?: string[]

		/** delegate scope */
		allowedScopes?: string[]

	}): Maybe<Testimony<X>> {

	const {
		atTime = Date.now(),
		maxAge,
		maxProofAge,
		allowedPurposes,
		allowedIssuers,
		allowedAudiences,
		allowedDelegators,
		allowedScopes,
	} = options

	type PPay = Payload<{proof: Proof}>
	type TPay = Payload<{testimony: TestimonySource<X>}>

	const testimonyDecoded = decodeToken<TPay>(token).payload
	const proofDecoded = decodeToken<PPay>(testimonyDecoded.testimony.proofToken).payload

	if (testimonyDecoded.iss !== proofDecoded.aud)
		return nay(`testimony iss disagrees with proof aud, "${testimonyDecoded.iss}", "${proofDecoded.aud}"`)

	const testimonyIssuedAt = happy(testimonyDecoded.iat)
		? tokenTime.toMs(testimonyDecoded.iat)
		: undefined

	if (!happy(testimonyIssuedAt))
		return nay(`testimony iat required`)

	const maybeProof = verifyProof(testimonyDecoded.testimony.proofToken, {
		maxAge: maxProofAge,
		allowedPurposes,
		allowedScopes,

		// we're checking if the proof was valid *when the testimony was signed*
		atTime: testimonyIssuedAt,
		
		// be wary, these are confusing, mixed point-of-view going on here
		allowedIssuers: allowedDelegators,
		allowedAudiences: allowedIssuers,

	})

	if (!maybeProof.yay)
		return maybeProof

	const maybeTestimony = verifyToken<TPay>(maybeProof.value.delegateId, token, {
		atTime,
		allowedIssuers,
		allowedAudiences,
	})

	if (!maybeTestimony.yay)
		return maybeTestimony

	const testimonyPayload = maybeTestimony.value
	const maybeFresh = checkFresh(testimonyPayload, atTime, maxAge)

	if (!maybeFresh.yay)
		return maybeFresh

	return yay({
		proof: maybeProof.value,
		data: testimonyPayload.testimony.data,
	})
}

