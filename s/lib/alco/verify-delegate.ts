
import {Payload} from "../tok/types.js"
import {Delegate, Proof} from "./types.js"
import {deriveId} from "../cryp/derive-id.js"
import {verifyToken} from "../tok/verify-token.js"

export function verifyDelegate(delegate: Delegate, options: {
		atTime?: number
		allowedDelegators?: string[]
		allowedPetitioners?: string[]
	} = {}) {

	const {signedBy, secret, proofToken} = delegate
	const delegateId = deriveId(secret)
	const {proof} = verifyToken<Payload<{proof: Proof}>>(signedBy, proofToken, {
		atTime: options.atTime,
		allowedIssuers: options.allowedDelegators,
		allowedAudiences: options.allowedPetitioners,
	})

	if (signedBy !== proof.signedBy)
		throw new Error("verification failed (signedBy)")

	if (delegateId !== proof.delegateId)
		throw new Error("verification failed (delegateId)")

	return delegate
}

