
import {Pubkey} from "../pubkey.js"
import {Keypair} from "../keypair.js"
import {JsonWebToken} from "../utils/json-web-token.js"

export const SimpleToken = {
	sign: async<D>(keypair: Keypair, expiresAt: number, data: D) => keypair.sign({
		data,
		iat: Date.now(),
		exp: JsonWebToken.fromJsTime(expiresAt),
	}),

	decode: <D>(token: string) => {
		return JsonWebToken.decode<{data: D}>(token).payload.data
	},

	verify: async<D>(pubkey: Pubkey, token: string) => {
		const payload = await pubkey.verify<{data: D}>(token)
		return payload.data
	},
}

