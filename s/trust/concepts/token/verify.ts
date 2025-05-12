
import {tokenTool} from "./tool.js"
import {verify} from "../crypto/crypto.js"
import {decodeToken} from "./decode.js"
import {Token, TokenVerifications, TokenVerifyError} from "./types.js"

export async function verifyToken<P extends Token>(
		id: string,
		token: string,
		options: TokenVerifications = {},
	): Promise<P> {

	const [headerText, payloadText] = token.split(".")
	const {payload, signature} = decodeToken<P>(token)
	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)

	const isValid = await verify(signingBytes, signature, id)

	if (!isValid)
		throw new TokenVerifyError("token signature invalid")

	if (options.atTime !== null) {
		const atTime = options.atTime ?? Date.now()

		if (payload.exp) {
			const expiresAt = tokenTool.toJsTime(payload.exp)
			if (atTime > expiresAt)
				throw new TokenVerifyError("token expired")
		}

		if (payload.nbf) {
			const notBefore = tokenTool.toJsTime(payload.nbf)
			if (atTime < notBefore)
				throw new TokenVerifyError("token not ready")
		}
	}

	if (options.allowedIssuers) {
		if (!payload.iss)
			throw new TokenVerifyError(`required iss (issuer) is missing`)
		if (!options.allowedIssuers.includes(payload.iss))
			throw new TokenVerifyError(`invalid iss (issuer) "${payload.iss}"`)
	}

	if (options.allowedAudiences) {
		if (!payload.aud)
			throw new TokenVerifyError(`required aud (audience) is missing`)
		if (!options.allowedAudiences.includes(payload.aud))
			throw new TokenVerifyError(`invalid aud (audience) "${payload.aud}"`)
	}

	if (payload.aud && !options.allowedAudiences)
		throw new TokenVerifyError(`allowedAudiences verification option was not provided, but is required because the token included "aud"`)

	return payload
}

