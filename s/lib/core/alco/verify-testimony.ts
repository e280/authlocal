
import {Maybe, nay, yay} from "@e280/stz"
import {Payload} from "../tok/types.js"
import {decodeToken} from "../tok/decode-token.js"
import {verifyToken} from "../tok/verify-token.js"
import {Proof, Testimony, TestimonySource} from "./types.js"

export function verifyTestimony<X>(token: string, {
		allowedIssuers, allowedAudiences, atTime,
	}: {

		/** allowed issuing parties, eg, the petitioner origins authorized to use the delegate */
		allowedIssuers: string[]

		/** allowed audience party, eg, the intended recipients of this testimony */
		allowedAudiences: string[]

		/** js time of verification time (for comparison with expiry) */
		atTime?: number

	}): Maybe<Testimony<X>> {

	atTime ??= Date.now()
	const {testimony, iss: testimonyIssuer} = decodeToken<Payload<{testimony: TestimonySource<X>}>>(token).payload
	const {proofToken, data} = testimony
	const {aud: proofAudience, proof: {id, delegateId}} = decodeToken<Payload<{proof: Proof}>>(proofToken).payload

	if (testimonyIssuer !== proofAudience)
		return nay(`testimony issuer and proof audience disagree, "${testimonyIssuer}", "${proofAudience}"`)

	const maybeProof = verifyToken(id, proofToken, {atTime, allowedAudiences: allowedIssuers})
	if (!maybeProof.yay)
		return maybeProof

	const maybeTestimony = verifyToken(delegateId, token, {atTime, allowedAudiences})
	if (!maybeTestimony.yay)
		return maybeTestimony

	return yay({id, data})
}

