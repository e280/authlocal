
import {Delegate, Proof} from "./types.js"
import {deriveId} from "../cryp/derive-id.js"
import {verifyToken} from "../tok/verify-token.js"
import {Payload, TokenVerifications} from "../tok/types.js"

export function verifyDelegate(delegate: Delegate, options: {
		allowedIssuers: string[]
		allowedAudiences: string[]
	} & TokenVerifications) {

	const {signedBy, secret, proofToken} = delegate
	const delegateId = deriveId(secret)
	const {proof} = verifyToken<Payload<{proof: Proof}>>(signedBy, proofToken, options)

	if (signedBy !== proof.signedBy)
		throw new Error("verification failed (signedBy)")

	if (delegateId !== proof.delegateId)
		throw new Error("verification failed (delegateId)")

	return delegate
}

