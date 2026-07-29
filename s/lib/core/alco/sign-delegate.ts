
import {happy, hex} from "@e280/stz"
import {hash} from "../cryp/hash.js"
import {Root} from "../cryp/types.js"
import {Payload} from "../tok/types.js"
import {deriveId} from "../cryp/derive-id.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {Delegate, Petition, Proof} from "./types.js"
import {deriveSecret} from "../cryp/derive-secret.js"

export function signDelegate(root: Root, {
		alias, petition, audience, issuer, atTime,
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
		atTime: number

	}): Delegate {

	const id = deriveId(root)
	const {purpose, scope, expiresAt} = petition

	const secret = deriveSecret(root, hash(audience, purpose, scope))
	const delegateId = deriveId(secret)

	const proof: Proof = {delegateId, id, purpose, scope}
	const proofToken = signToken<Payload<{proof: Proof}>>(root, {
		proof,
		jti: hex.random(16),
		iat: tokenTime.at(atTime),
		iss: issuer,
		aud: audience,
		exp: happy(expiresAt)
			? tokenTime.at(expiresAt)
			: undefined,
	})

	return {secret, alias, proofToken}
}

