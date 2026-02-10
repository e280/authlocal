
import {signToken} from "../tok/sign.js"
import {tokenTime} from "../tok/time.js"
import {Payload} from "../tok/types.js"
import {verifyToken} from "../tok/verify.js"
import {Keypair, Secret} from "../cryp/types.js"
import {Delegate, Petition, Proof} from "./types.js"
import {deriveId, deriveSecret} from "../cryp/derive.js"

export async function signDelegate(
		scope: Secret,
		petition: Petition,
	): Promise<Delegate> {

	const {purpose, expiresAt} = petition

	const signedBy = await deriveId(scope)
	const secret = await deriveSecret(scope, purpose)
	const delegateId = await deriveId(secret)

	const keypair: Keypair = {secret, id: delegateId}
	const proof: Proof = {delegateId, signedBy}

	const proofToken = await signToken<Payload<{proof: Proof}>>(scope, {
		proof,
		exp: tokenTime.at(expiresAt),
	})

	return {signedBy, keypair, proofToken}
}

export async function verifyDelegate(delegate: Delegate) {
	const {signedBy, keypair, proofToken} = delegate

	const {proof} = await verifyToken<Payload<{proof: Proof}>>(signedBy, proofToken)

	if (signedBy !== proof.signedBy)
		throw new Error("verification failed (signedBy)")

	if (keypair.id !== proof.delegateId)
		throw new Error("verification failed (delegateId)")

	return delegate
}

