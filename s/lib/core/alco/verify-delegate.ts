
import {Delegate, Proof} from "./types.js"
import {deriveId} from "../cryp/derive-id.js"
import {verifyProof} from "./verify-proof.js"
import {TokenErr} from "../errs/token-err.js"

export function verifyDelegate(delegate: Delegate, options: {
		allowedPurposes: string[]
		allowedAudiences: string[]
		allowedScopes?: string[]
		allowedIssuers?: string[]
		atTime?: number
		maxAge?: number
	}): {delegate: Delegate, proof: Proof} {

	const proof = verifyProof(delegate.proofToken, options)

	if (deriveId(delegate.secret) !== proof.delegateId)
		throw new TokenErr("delegateId mismatch")

	return {delegate, proof}
}

