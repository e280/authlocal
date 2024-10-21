
import {Pubkey} from "./pubkey.js"
import {Access, AccessJwtPayload} from "./types.js"
import {JsonWebToken} from "./utils/json-web-token.js"

export async function verify(token: string): Promise<Access> {
	const {payload} = JsonWebToken.decode<AccessJwtPayload>(token)
	const {exp, sub: thumbprint} = payload
	const {name, publicKey} = payload.data

	const pubkey = await Pubkey.fromJson({thumbprint, publicKey})
	await pubkey.verify(token)

	return {
		name,
		publicKey,
		thumbprint,
		audience: payload.aud,
		expiry: JsonWebToken.toJsTime(exp),
	}
}

export function isExpired(token: string) {
	const {payload} = JsonWebToken.decode<AccessJwtPayload>(token)
	const expired = JsonWebToken.toJsTime(payload.exp)
	return Date.now() > expired
}

