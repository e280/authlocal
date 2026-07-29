
import {happy} from "@e280/stz"
import {Payload} from "../tok/types.js"
import {TokenErr} from "../errs/token-err.js"
import {verifyProof} from "./verify-proof.js"
import {tokenTime} from "../tok/token-time.js"
import {decodeToken} from "../tok/decode-token.js"
import {verifyToken} from "../tok/verify-token.js"
import {Proof, Testimony, TestimonySource} from "./types.js"

export function verifyTestimony<X>(token: string, options: {

		/** app origins */
		allowedIssuers: string[]

		/** intended recipients of this testimony (your server or something) */
		allowedAudiences: string[]

		/** js time of verification time (for comparison with expiry) */
		atTime?: number

		/** maximum age of the testimony token */
		maxAge?: number

		/** maximum age of the proof token */
		maxProofAge?: number

		/** delegators like "https://authlocal.org" */
		allowedDelegators?: string[]

		/** delegate purposes like "auth" */
		allowedPurposes?: string[]

		/** delegate scope */
		allowedScopes?: string[]

	}): Testimony<X> {

	const {
		allowedIssuers,
		allowedAudiences,

		atTime = Date.now(),
		maxAge,
		maxProofAge,
		allowedPurposes,
		allowedDelegators,
		allowedScopes,
	} = options

	type PPay = Payload<{proof: Proof}>
	type TPay = Payload<{testimony: TestimonySource<X>}>

	const testimonyDecoded = decodeToken<TPay>(token).payload
	const proofDecoded = decodeToken<PPay>(testimonyDecoded.testimony.proofToken).payload

	if (testimonyDecoded.iss !== proofDecoded.aud)
		throw new TokenErr(`testimony iss disagrees with proof aud, "${testimonyDecoded.iss}", "${proofDecoded.aud}"`)

	const testimonyIssuedAt = happy(testimonyDecoded.iat)
		? tokenTime.toMs(testimonyDecoded.iat)
		: undefined

	if (!happy(testimonyIssuedAt))
		throw new TokenErr(`testimony iat required`)

	const proof = verifyProof(testimonyDecoded.testimony.proofToken, {
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
		allowedIssuers,
		allowedAudiences,
	})

	return {proof, data: testimony.data}
}

