
import {Maybe, nay, yay} from "@e280/stz"
import {Payload} from "../tok/types.js"
import {consts} from "../../../consts.js"
import {verifyProof} from "./verify-proof.js"
import {decodeToken} from "../tok/decode-token.js"
import {verifyToken} from "../tok/verify-token.js"
import {Proof, Testimony, TestimonySource} from "./types.js"

export function verifyTestimony<X>(token: string, {
		allowedIssuers, allowedAudiences, allowedDelegators, allowedPurposes, allowedScopes, atTime,
	}: {

		/** petitioner origins authorized to use the delegate */
		allowedIssuers: string[]

		/** intended recipients of this testimony */
		allowedAudiences: string[]

		/** delegators like "https://authlocal.org" */
		allowedDelegators?: string[]

		/** delegate purposes like "auth" */
		allowedPurposes?: string[]

		/** delegate scope */
		allowedScopes?: string[]

		/** js time of verification time (for comparison with expiry) */
		atTime?: number

	}): Maybe<Testimony<X>> {

	atTime ??= Date.now()
	allowedPurposes ??= [consts.purposes.auth]

	type PPay = Payload<{proof: Proof}>
	type TPay = Payload<{testimony: TestimonySource<X>}>

	const {iss: testimonyIssuer, testimony: {proofToken}} = decodeToken<TPay>(token).payload
	const {aud: proofAudience, proof: {delegateId}} = decodeToken<PPay>(proofToken).payload

	if (testimonyIssuer !== proofAudience)
		return nay(`testimony issuer disagrees with proof audience, "${testimonyIssuer}", "${proofAudience}"`)

	const maybeProof = verifyProof(proofToken, {
		atTime,
		allowedPurposes,
		allowedScopes,
		allowedDelegators,
		allowedPetitioners: allowedIssuers,
	})
	if (!maybeProof.yay)
		return maybeProof

	const maybeTestimony = verifyToken<TPay>(delegateId, token, {
		atTime,
		allowedAudiences,
		allowedIssuers,
	})
	if (!maybeTestimony.yay)
		return maybeTestimony

	return yay({
		proof: maybeProof.value,
		data: maybeTestimony.value.testimony.data,
	})
}

