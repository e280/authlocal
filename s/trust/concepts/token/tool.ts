
import {Hex} from "@e280/stz"
import {TokenParams} from "./types.js"
import {decodeToken} from "./decode.js"

export const tokenTool = {
	toJsTime: (t: number) => t * 1000,
	fromJsTime: (t: number) => t / 1000,

	params: (r: TokenParams) => ({
		jti: Hex.random(32),
		nbf: r.notBefore,
		iss: r.issuer,
		aud: r.audience,
		iat: r.issuedAt
			? tokenTool.fromJsTime(r.issuedAt)
			: undefined,
		exp: r.expiresAt !== undefined
			? tokenTool.fromJsTime(r.expiresAt)
			: undefined,
	}),

	expiresAt(token: string) {
		const {exp} = decodeToken(token).payload
		return exp === undefined
			? undefined
			: tokenTool.toJsTime(exp)
	},

	isExpired(token: string, time = Date.now()) {
		const expiresAt = this.expiresAt(token)
		return expiresAt === undefined
			? false
			: time >= expiresAt
	},

	fuzzTiming({time, randomness, additive}: {
			time: number
			randomness: number
			additive: boolean
		}) {
		const resolution = randomness / 10
		const bucketed = Math.floor(
			additive
				? Math.ceil(time / resolution) * resolution
				: Math.floor(time / resolution) * resolution
		)
		const offset = Math.floor(Math.random() * randomness)
		return additive
			? bucketed + offset
			: bucketed - offset
	},
}

