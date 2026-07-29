
import {happy, hex} from "@e280/stz"
import {Proof} from "../proof/types.js"
import {hash} from "../../cryp/hash.js"
import {Secret} from "../../cryp/types.js"
import {Payload} from "../../tok/types.js"
import {Delegate, Petition} from "./types.js"
import {deriveId} from "../../cryp/derive-id.js"
import {signToken} from "../../tok/sign-token.js"
import {tokenTime} from "../../tok/token-time.js"
import {deriveSecret} from "../../cryp/derive-secret.js"

export function signDelegate(secret: Secret, {
		alias, petition, audience, issuer, atTime = Date.now(),
	}: {

		/** user identity alias to be included in the delegate */
		alias: string,

		/** petition describing the desired delegate */
		petition: Petition,

		/** origin of the app that sends petitions (eg, "https://e280.org") */
		audience: string

		/** origin of the delegator that signs delegates (eg, "https://authlocal.org") */
		issuer: string

		/** js time when we are signing this delegate */
		atTime?: number

	}): Delegate {

	const id = deriveId(secret)
	const {purpose, scope, expiresAt} = petition

	const delegateSecret = deriveSecret(secret, hash("authlocal/delegate/v1", audience, purpose, scope))
	const delegateId = deriveId(delegateSecret)

	const proof: Proof = {delegateId, id, purpose, scope}
	const proofToken = signToken<Payload<{proof: Proof}>>(secret, {
		proof,
		jti: hex.random(16),
		iat: tokenTime.at(atTime),
		iss: issuer,
		aud: audience,
		exp: happy(expiresAt)
			? tokenTime.at(expiresAt)
			: undefined,
	})

	return {secret: delegateSecret, alias, proofToken}
}

