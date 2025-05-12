
import {decodeToken} from "./decode.js"

export const tokentime = {

	/** convert jtw seconds to js milliseconds */
	toMs: (t: number) => t * 1000,

	/** convert js milliseconds to jwt seconds */
	at: (ms: number) => ms / 1000,

	/** convert js milliseconds to jwt seconds, or undefined */
	maybe: (ms?: number) => ms !== undefined
		? ms / 1000
		: undefined,

	/** read the expiry time of a token, converting the time to js milliseconds */
	readExpiry(token: string) {
		const {exp} = decodeToken(token).payload
		return exp === undefined
			? undefined
			: tokentime.toMs(exp)
	},

	/** return true if the jwt is expired */
	isExpired(token: string, time = Date.now()) {
		const expiresAt = this.readExpiry(token)
		return expiresAt === undefined
			? false
			: time >= expiresAt
	},

	/** obscure a timestamp using some randomness */
	fuzz({time, randomness, additive}: {
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

