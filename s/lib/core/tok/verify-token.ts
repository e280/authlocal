
import {happy} from "@e280/stz"
import {Id} from "../cryp/types.js"
import {tokenTime} from "./token-time.js"
import {TokenErr} from "../errs/token-err.js"
import {decodeToken} from "./decode-token.js"
import {verifyBytes} from "../cryp/verify-bytes.js"
import {assertFresh} from "./utils/assert-fresh.js"
import {Payload, TokenVerifications} from "./types.js"

export function verifyToken<P extends Payload>(
		id: Id,
		token: string,
		options: TokenVerifications = {},
	): P {

	const {
		atTime = Date.now(),
		maxAge,
		allowedIssuers,
		allowedAudiences,
	} = options

	const [headerText, payloadText] = token.split(".")
	const {payload, signature} = decodeToken<P>(token)
	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)

	if (!verifyBytes(id, signingBytes, signature))
		throw new TokenErr(`bad signature`)

	if (happy(payload.exp)) {
		const expiresAt = tokenTime.toMs(payload.exp)
		if (atTime >= expiresAt)
			throw new TokenErr(`expired`)
	}

	if (happy(payload.nbf)) {
		const notBefore = tokenTime.toMs(payload.nbf)
		if (atTime < notBefore)
			throw new TokenErr(`too soon for nbf`)
	}

	if (allowedIssuers) {
		if (!payload.iss)
			throw new TokenErr(`missing iss`)
		if (!allowedIssuers.includes(payload.iss))
			throw new TokenErr(`bad iss "${payload.iss}"`)
	}

	if (allowedAudiences) {
		if (!payload.aud)
			throw new TokenErr(`missing aud`)
		if (!allowedAudiences.includes(payload.aud))
			throw new TokenErr(`bad aud "${payload.aud}"`)
	}

	if (payload.aud && !allowedAudiences)
		throw new TokenErr(`aud requires allowedAudiences but it was not provided`)

	assertFresh(payload, atTime, maxAge)

	return payload
}

