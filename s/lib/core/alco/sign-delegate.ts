
import {hex, time} from "@e280/stz"
import {hash} from "../cryp/hash.js"
import {Root} from "../cryp/types.js"
import {Payload} from "../tok/types.js"
import {consts} from "../../../consts.js"
import {deriveId} from "../cryp/derive-id.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {Delegate, Petition, Proof} from "./types.js"
import {deriveSecret} from "../cryp/derive-secret.js"

export function signDelegate(root: Root, {
		alias, petition, petitionerOrigin, delegatorOrigin, atTime,
	}: {
		/** user identity alias to be included in the delegate */
		alias: string,

		/** petition describing the desired delegate */
		petition: Petition,

		/** origin of the app that sends petitions (eg, "https://e280.org") */
		petitionerOrigin: string

		/** origin of the delegator that signs delegates (eg, "https://authlocal.org") */
		delegatorOrigin: string

		/** js time when we are signing this delegate */
		atTime: number
	}): Delegate {

	const identityId = deriveId(root)
	const {purpose, scope} = petition

	const expiresAt = Math.min(
		petition.expiresAt,
		atTime + time.days(consts.maxProofExpiryDays),
	)

	const secret = deriveSecret(root, hash(purpose, scope))
	const delegateId = deriveId(secret)

	const proof: Proof = {delegateId, identityId}
	const proofToken = signToken<Payload<{proof: Proof}>>(root, {
		jti: hex.random(16),
		exp: tokenTime.at(expiresAt),
		aud: petitionerOrigin,
		iss: delegatorOrigin,
		proof,
	})

	return {secret, identityId, alias, purpose, scope, proofToken}
}

