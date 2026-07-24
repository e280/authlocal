
import {hash} from "../cryp/hash.js"
import {Secret} from "../cryp/types.js"
import {Payload} from "../tok/types.js"
import {deriveId} from "../cryp/derive-id.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {deriveSecret} from "../cryp/derive-secret.js"
import {Delegate, Venue, Petition, Proof} from "./types.js"

export function signDelegate(
		sourceSecret: Secret,
		petition: Petition,
		venue: Venue,
	): Delegate {

	const {scope, expiresAt} = petition
	const signedBy = deriveId(sourceSecret)
	const secret = deriveSecret(sourceSecret, hash(scope))
	const delegateId = deriveId(secret)

	const proof: Proof = {delegateId, signedBy}
	const proofToken = signToken<Payload<{proof: Proof}>>(sourceSecret, {
		proof,
		exp: tokenTime.at(expiresAt),
		aud: venue.appOrigin,
		iss: venue.authorityOrigin,
	})

	return {signedBy, secret, proofToken}
}

