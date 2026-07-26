
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
		allowedScopes?: string[]
		allowedPurposes?: string[]
	} = {}): Maybe<Delegate> {

	const delegateId = deriveId(delegate.secret)
	const token = verifyToken<Payload<{proof: Proof}>>(delegate.signedBy, delegate.proofToken, {
		atTime: options.atTime,
		allowedIssuers: options.allowedDelegators,
		allowedAudiences: options.allowedPetitioners,
	})

	if (isNay(token))
		return token

	const {proof} = gotValue(token)

	if (delegate.signedBy !== proof.signedBy)
		return nay("delegate/proof mismatch (signedBy)")

	if (delegateId !== proof.delegateId)
		return nay("delegate/proof mismatch (delegateId)")

	if (delegate.purpose !== proof.purpose)
		return nay("delegate/proof mismatch (purpose)")

	if (delegate.scope !== proof.scope)
		return nay("delegate/proof mismatch (scope)")

	if (options.allowedPurposes && !options.allowedPurposes.includes(proof.purpose))
		return nay(`purpose not allowed "${proof.purpose}"`)

	if (options.allowedScopes && !options.allowedScopes.includes(proof.scope))
		return nay(`scope not allowed "${proof.scope}"`)

	const alias = validateAlias(delegate.alias)

	if (isNay(alias))
		return alias

	return yay(delegate)
}

