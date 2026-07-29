
import {happy, hex} from "@e280/stz"
import {Secret} from "../../cryp/types.js"
import {TestimonyOptions} from "./options.js"
import {signToken} from "../../tok/sign-token.js"
import {tokenTime} from "../../tok/token-time.js"

export function signTestimony<X>(
		delegate: {secret: Secret, proofToken: string},
		data: X,
		options: TestimonyOptions = {}
	) {

	const {secret, proofToken} = delegate
	const {audience, expiresAt, atTime = Date.now()} = options

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

