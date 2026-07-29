
import {Delegate} from "./types.js"
import {Proof} from "../proof/types.js"
import {verifyProof} from "../proof/verify.js"
import {deriveId} from "../../cryp/derive-id.js"
import {TokenErr} from "../../errs/token-err.js"

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

