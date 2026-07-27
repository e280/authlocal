
import {Maybe, nay, yay} from "@e280/stz"
import {Delegate, Proof} from "./types.js"
import {deriveId} from "../cryp/derive-id.js"
import {verifyProof} from "./verify-proof.js"

export function verifyDelegate(delegate: Delegate, options: {
		allowedPurposes: string[]
		allowedPetitioners: string[]
		allowedScopes?: string[]
		allowedDelegators?: string[]
		atTime?: number
	}): Maybe<{delegate: Delegate, proof: Proof}> {

	const maybeProof = verifyProof(delegate.proofToken, options)

	if (!maybeProof.yay)
		return maybeProof

	const proof = maybeProof.value

	if (deriveId(delegate.secret) !== proof.delegateId)
		return nay("delegateId mismatch")

	return yay({delegate, proof})
}

