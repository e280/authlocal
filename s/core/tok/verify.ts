
import {time} from "./time.js"
import {cryp} from "../index.js"
import {decode} from "./decode.js"
import {Id} from "../cryp/types.js"
import {Payload, Verifications, VerifyError} from "./types.js"

export async function verify<P extends Payload>(
		id: Id,
		token: string,
		options: Verifications = {},
	): Promise<P> {

	const [headerText, payloadText] = token.split(".")
	const {payload, signature} = decode<P>(token)
	const signingText = `${headerText}.${payloadText}`
	const signingBytes = new TextEncoder().encode(signingText)

	if (!await cryp.verify(id, signingBytes, signature))
		throw new VerifyError("token signature invalid")

	if (options.atTime !== null) {
		const atTime = options.atTime ?? Date.now()

		if (payload.exp) {
			const expiresAt = time.toMs(payload.exp)
			if (atTime > expiresAt)
				throw new VerifyError("token expired")
		}

		if (payload.nbf) {
			const notBefore = time.toMs(payload.nbf)
			if (atTime < notBefore)
				throw new VerifyError("token not ready")
		}
	}

	if (options.allowedIssuers) {
		if (!payload.iss)
			throw new VerifyError(`required iss (issuer) is missing`)
		if (!options.allowedIssuers.includes(payload.iss))
			throw new VerifyError(`invalid iss (issuer) "${payload.iss}"`)
	}

	if (options.allowedAudiences) {
		if (!payload.aud)
			throw new VerifyError(`required aud (audience) is missing`)
		if (!options.allowedAudiences.includes(payload.aud))
			throw new VerifyError(`invalid aud (audience) "${payload.aud}"`)
	}

	if (payload.aud && !options.allowedAudiences)
		throw new VerifyError(`allowedAudiences verification option was not provided, but is required because the token included "aud"`)

	return payload
}

