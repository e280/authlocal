
import {Payload} from "../tok/types.js"
import {signToken} from "../tok/sign.js"
import {tokenTime} from "../tok/time.js"
import {verifyToken} from "../tok/verify.js"
import {Keypair, Secret} from "../cryp/types.js"
import {Delegate, Petition, Proof} from "./types.js"
import {deriveId, deriveScopedSecret} from "../cryp/derive.js"

export function signDelegate(viceroy: Secret, petition: Petition): Delegate {
	const {scope, expiresAt} = petition

	const signedBy = deriveId(viceroy)
	const secret = deriveScopedSecret(viceroy, scope)
	const delegateId = deriveId(secret)

	const keypair: Keypair = {secret, id: delegateId}
	const proof: Proof = {delegateId, signedBy}

	const proofToken = signToken<Payload<{proof: Proof}>>(viceroy, {
		proof,
		exp: tokenTime.at(expiresAt),
	})

	return {signedBy, keypair, proofToken}
}

export function verifyDelegate(delegate: Delegate) {
	const {signedBy, keypair, proofToken} = delegate

	const {proof} = verifyToken<Payload<{proof: Proof}>>(signedBy, proofToken)

	if (signedBy !== proof.signedBy)
		throw new Error("verification failed (signedBy)")

	if (keypair.id !== proof.delegateId)
		throw new Error("verification failed (delegateId)")

	return delegate
}

