
import {hash} from "../cryp/hash.js"
import {Secret} from "../cryp/types.js"
import {Payload} from "../tok/types.js"
import {deriveId} from "../cryp/derive-id.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {Delegate, Petition, Proof} from "./types.js"
import {deriveSecret} from "../cryp/derive-secret.js"

export function signDelegate({secret, alias, petition, petitionerOrigin, delegatorOrigin}: {
		secret: Secret,

		alias: string,

		petition: Petition,

		/** origin of the app that sends petitions (eg, "https://e280.org") */
		petitionerOrigin: string

		/** origin of the delegator that signs delegates (eg, "https://authlocal.org") */
		delegatorOrigin: string
	}): Delegate {

	const signedBy = deriveId(secret)

	const delegateSecret = deriveSecret(secret, hash(petition.scope))
	const delegateId = deriveId(delegateSecret)

	const proof: Proof = {delegateId, signedBy}
	const proofToken = signToken<Payload<{proof: Proof}>>(secret, {
		proof,
		exp: tokenTime.at(petition.expiresAt),
		aud: petitionerOrigin,
		iss: delegatorOrigin,
	})

	return {signedBy, alias, secret: delegateSecret, proofToken}
}

