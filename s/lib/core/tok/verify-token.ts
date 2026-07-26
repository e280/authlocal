
import {Maybe, nay, yay} from "@e280/stz"
import {Id} from "../cryp/types.js"
import {tokenTime} from "./token-time.js"
import {decodeToken} from "./decode-token.js"
import {verifyBytes} from "../cryp/verify-bytes.js"
import {Payload, TokenVerifications} from "./types.js"

export function verifyToken<P extends Payload>(
		id: Id,
		token: string,
		options: TokenVerifications = {},
	): Maybe<P> {

	const [headerText, payloadText] = token.split(".")
	const {payload, signature} = decodeToken<P>(token)
	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)

	if (!verifyBytes(id, signingBytes, signature))
		return nay(`bad signature`)

	if (options.atTime !== null) {
		const atTime = options.atTime ?? Date.now()

		if (payload.exp) {
			const expiresAt = tokenTime.toMs(payload.exp)
			if (atTime >= expiresAt)
				return nay(`expired`)
		}

		if (payload.nbf) {
			const notBefore = tokenTime.toMs(payload.nbf)
			if (atTime < notBefore)
				return nay(`too soon for nbf`)
		}
	}

	if (options.allowedIssuers) {
		if (!payload.iss)
			return nay(`missing iss`)
		if (!options.allowedIssuers.includes(payload.iss))
			return nay(`bad iss "${payload.iss}"`)
	}

	if (options.allowedAudiences) {
		if (!payload.aud)
			return nay(`missing aud`)
		if (!options.allowedAudiences.includes(payload.aud))
			return nay(`bad aud "${payload.aud}"`)
	}

	if (payload.aud && !options.allowedAudiences)
		return nay(`aud requires allowedAudiences but it was not provided`)

	if (payload.iss && !options.allowedIssuers)
		return nay(`iss requires allowedIssuers but it was not provided`)

	return yay(payload)
}

