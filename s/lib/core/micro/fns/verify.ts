
import {Id} from "../../cryp/types.js"
import {microDecode} from "./decode.js"
import {verifyBytes} from "../../cryp/verify-bytes.js"

export function microVerify(id: Id, token: string, options: {
		atTime?: number
		allowedAudiences?: string[]
	} = {}) {

	const decoded = microDecode(token)

	if (!verifyBytes(id, decoded.message, decoded.signature))
		throw new Error("micro token failed verification")

	if (options.allowedAudiences && !options.allowedAudiences.includes(decoded.audience))
		throw new Error("micro token audience not allowed")

	if ((options.atTime ?? Date.now()) >= decoded.expiresAt)
		throw new Error("micro token expired")

	return decoded
}

