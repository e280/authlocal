
import {hex} from "@e280/stz"
import {Secret} from "../cryp/types.js"
import {signToken} from "../tok/sign-token.js"
import {tokenTime} from "../tok/token-time.js"
import {normalizeExpiresAt} from "./normalize-expires-at.js"

export function signTestimony<X>({
		secret, audience, issuer, proofToken, expiresAt, atTime, data,
	}: {
		secret: Secret
		proofToken: string
		data: X
		atTime: number
		issuer: string
		audience: string
		expiresAt?: number
	}): string {

	return signToken(secret, {
		jti: hex.random(16),
		iat: tokenTime.at(atTime),
		aud: audience,
		iss: issuer,
		exp: expiresAt === undefined
			? undefined
			: tokenTime.at(normalizeExpiresAt(expiresAt, atTime)),
		testimony: {data, proofToken},
	})
}

