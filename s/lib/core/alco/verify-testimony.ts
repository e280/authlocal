
import {nay, yay} from "@e280/stz"
import {Payload} from "../tok/types.js"
import {Proof, Testimony} from "./types.js"
import {decodeToken} from "../tok/decode-token.js"
import {verifyToken} from "../tok/verify-token.js"

export function verifyTestimony<X>({
		testimonyToken, atTime, allowedIssuers, allowedAudiences,
	}: {
		testimonyToken: string
		atTime: number
		allowedIssuers: string[]
		allowedAudiences: string[]
	}) {

	atTime ??= Date.now()
	const {testimony, iss: testimonyIssuer} = decodeToken<Payload<{testimony: Testimony<X>}>>(testimonyToken).payload
	const {proofToken, data} = testimony
	const {identityId, delegateId, aud: proofAudience} = decodeToken<Payload<Proof>>(proofToken).payload

	if (testimonyIssuer !== proofAudience)
		return nay(`testimony issuer and proof audience disagree, "${testimonyIssuer}", "${proofAudience}"`)

	const maybeProof = verifyToken<Payload<Proof>>(identityId, proofToken, {atTime, allowedAudiences: allowedIssuers})
	if (!maybeProof.yay)
		return maybeProof

	const maybeTestimony = verifyToken<Payload<Testimony<X>>>(delegateId, testimonyToken, {atTime, allowedIssuers, allowedAudiences})
	if (!maybeTestimony.yay)
		return maybeTestimony

	return yay({identityId, data})
}

