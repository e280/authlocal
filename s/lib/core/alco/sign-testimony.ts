
import {happy, hex} from "@e280/stz"
import {Secret} from "../cryp/types.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {TestimonyOptions} from "./testimony-options.js"

export function signTestimony<X>(secret: Secret, proofToken: string, data: X, {
		audience, expiresAt, atTime = Date.now(),
	}: TestimonyOptions = {}) {

	return signToken(secret, {
		testimony: {data, proofToken},
		jti: hex.random(16),
		iat: tokenTime.at(atTime),
		aud: audience,
		exp: happy(expiresAt)
			? tokenTime.at(expiresAt)
			: undefined,
	})
}

