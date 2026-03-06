
import {Secret} from "../cryp/types.js"
import {deriveId} from "../cryp/derive-id.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {verifyToken} from "../tok/verify-token.js"
import {Delegate, Petition, Proof} from "./types.js"
import {Payload, TokenVerifications} from "../tok/types.js"
import {deriveScopedSecret} from "../cryp/derive-scoped-secret.js"

export function signDelegate(viceroy: Secret, petition: Petition): Delegate {
	const {scope, expiresAt} = petition

	const signedBy = deriveId(viceroy)
	const secret = deriveScopedSecret(viceroy, scope)
	const delegateId = deriveId(secret)

	const proof: Proof = {delegateId, signedBy}
	const proofToken = signToken<Payload<{proof: Proof}>>(viceroy, {
		proof,
		exp: tokenTime.at(expiresAt),
		iss: petition.issuer,
		aud: petition.audience,
	})

	return {signedBy, secret, proofToken}
}

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

