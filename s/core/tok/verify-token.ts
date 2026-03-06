
import {tokenTime} from "./token-time.js"
import {Id} from "../cryp/types.js"
import {decodeToken} from "./decode-token.js"
import {verifyBytes} from "../cryp/signing.js"
import {Payload, TokenVerifications, TokenVerifyErr} from "./types.js"

export function verifyToken<P extends Payload>(
		id: Id,
		token: string,
		options: TokenVerifications = {},
	): P {

	const [headerText, payloadText] = token.split(".")
	const {payload, signature} = decodeToken<P>(token)
	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)

	if (!verifyBytes(id, signingBytes, signature))
		throw new TokenVerifyErr("token signature invalid")

	if (options.atTime !== null) {
		const atTime = options.atTime ?? Date.now()

		if (payload.exp) {
			const expiresAt = tokenTime.toMs(payload.exp)
			if (atTime >= expiresAt)
				throw new TokenVerifyErr("token expired")
		}

		if (payload.nbf) {
			const notBefore = tokenTime.toMs(payload.nbf)
			if (atTime < notBefore)
				throw new TokenVerifyErr("token not ready")
		}
	}

	if (options.allowedIssuers) {
		if (!payload.iss)
			throw new TokenVerifyErr(`required iss (issuer) is missing`)
		if (!options.allowedIssuers.includes(payload.iss))
			throw new TokenVerifyErr(`invalid iss (issuer) "${payload.iss}"`)
	}

	if (options.allowedAudiences) {
		if (!payload.aud)
			throw new TokenVerifyErr(`required aud (audience) is missing`)
		if (!options.allowedAudiences.includes(payload.aud))
			throw new TokenVerifyErr(`invalid aud (audience) "${payload.aud}"`)
	}

	if (payload.aud && !options.allowedAudiences)
		throw new TokenVerifyErr(`allowedAudiences verification option was not provided, but is required because the token included "aud"`)

	if (payload.iss && !options.allowedIssuers)
		throw new TokenVerifyErr(`allowedIssuers verification option was not provided, but is required because the token included "iss"`)

	return payload
}

