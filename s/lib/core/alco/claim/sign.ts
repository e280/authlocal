
import {happy, hex} from "@e280/stz"
import {ClaimOptions} from "./options.js"
import {Secret} from "../../cryp/types.js"
import {signToken} from "../../tok/sign-token.js"
import {tokenTime} from "../../tok/token-time.js"

export function signClaim<X>(
		delegate: {secret: Secret, proofToken: string},
		data: X,
		options: ClaimOptions = {}
	) {

	const {secret, proofToken} = delegate
	const {audience, expiresAt, atTime = Date.now()} = options

	return signToken(secret, {
		claim: {data, proofToken},
		jti: hex.random(16),
		iat: tokenTime.at(atTime),
		aud: audience,
		exp: happy(expiresAt)
			? tokenTime.at(expiresAt)
			: undefined,
	})
}

