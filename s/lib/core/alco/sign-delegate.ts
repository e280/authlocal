
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
import {normalizeExpiresAt} from "./normalize-expires-at.js"

export function signDelegate(root: Root, {
		alias, petition, appOrigin, delegatorOrigin, atTime,
	}: {

		/** user identity alias to be included in the delegate */
		alias: string,

		/** petition describing the desired delegate */
		petition: Petition,

		/** origin of the app that sends petitions (eg, "https://e280.org") */
		appOrigin: string

		/** origin of the delegator that signs delegates (eg, "https://authlocal.org") */
		delegatorOrigin: string

		/** js time when we are signing this delegate */
		atTime: number

	}): Delegate {

	const id = deriveId(root)
	const {purpose, scope} = petition

	const expiresAt = Math.min(
		normalizeExpiresAt(petition.expiresAt, atTime),
		atTime + time.days(consts.maxProofExpiryDays),
	)

	const secret = deriveSecret(root, hash(appOrigin, purpose, scope))
	const delegateId = deriveId(secret)

	const proof: Proof = {delegateId, id, purpose, scope}
	const proofToken = signToken<Payload<{proof: Proof}>>(root, {
		jti: hex.random(16),
		iat: tokenTime.at(atTime),
		exp: tokenTime.at(expiresAt),
		aud: appOrigin,
		iss: delegatorOrigin,
		proof,
	})

	return {secret, alias, proofToken}
}

