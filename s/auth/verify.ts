
import {Pubkey} from "./pubkey.js"
import {AccessJwtPayload, Login} from "./types.js"
import {JsonWebToken, VerificationOptions} from "./utils/json-web-token.js"

export async function verify(
		token: string,
		options: VerificationOptions = {},
	): Promise<Login | null> {

	try {
		const {payload} = JsonWebToken.decode<AccessJwtPayload>(token)
		const thumbprint = payload.sub
		const {name, publicKey} = payload.data

		const pubkey = await Pubkey.fromJson({thumbprint, publicKey})
		await pubkey.verify(token, options)

		return {
			token,
			name,
			publicKey,
			thumbprint,
			issuer: payload.iss,
			audience: payload.aud,
			expiry: JsonWebToken.toJsTime(payload.exp),
		}
	}
	catch {
		return null
	}
}

export function isExpired(token: string) {
	const {payload} = JsonWebToken.decode<AccessJwtPayload>(token)
	const expired = JsonWebToken.toJsTime(payload.exp)
	return Date.now() > expired
}

