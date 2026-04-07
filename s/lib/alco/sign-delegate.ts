
import {hash} from "../cryp/hash.js"
import {Secret} from "../cryp/types.js"
import {Payload} from "../tok/types.js"
import {deriveId} from "../cryp/derive-id.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {deriveSecret} from "../cryp/derive-secret.js"
import {Delegate, Venue, Petition, Proof} from "./types.js"

export function signDelegate(
		viceroy: Secret,
		petition: Petition,
		venue: Venue,
	): Delegate {

	const {scope, expiresAt} = petition

	const signedBy = deriveId(viceroy)
	const secret = deriveSecret(viceroy, hash(scope))
	const delegateId = deriveId(secret)

	const proof: Proof = {delegateId, signedBy}
	const proofToken = signToken<Payload<{proof: Proof}>>(viceroy, {
		proof,
		exp: tokenTime.at(expiresAt),
		aud: venue.petitioner,
		iss: venue.delegator,
	})

	return {signedBy, secret, proofToken}
}

