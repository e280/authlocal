
import {gotValue, isNay, Maybe, nay, yay} from "@e280/stz"
import {Payload} from "../tok/types.js"
import {Delegate, Proof} from "./types.js"
import {validateAlias} from "./validation.js"
import {deriveId} from "../cryp/derive-id.js"
import {verifyToken} from "../tok/verify-token.js"

export function verifyDelegate(delegate: Delegate, options: {
		atTime?: number
		allowedDelegators?: string[]
		allowedPetitioners?: string[]
	} = {}): Maybe<Delegate> {

	const delegateId = deriveId(delegate.secret)
	const token = verifyToken<Payload<{proof: Proof}>>(delegate.identityId, delegate.proofToken, {
		atTime: options.atTime,
		allowedIssuers: options.allowedDelegators,
		allowedAudiences: options.allowedPetitioners,
	})

	if (isNay(token))
		return token

	const {proof} = gotValue(token)

	if (delegate.identityId !== proof.identityId)
		return nay("delegate/proof mismatch (identityId)")

	if (delegateId !== proof.delegateId)
		return nay("delegate/proof mismatch (delegateId)")

	const alias = validateAlias(delegate.alias)

	if (isNay(alias))
		return alias

	return yay(delegate)
}

