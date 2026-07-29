
import {happy, Maybe, nay, yay} from "@e280/stz"
import {Payload} from "../../tok/types.js"
import {tokenTime} from "../../tok/token-time.js"

export function checkFresh(payload: Payload, atTime: number, maxAge?: number): Maybe<true> {
	if (maxAge === undefined)
		return yay(true)

	if (!happy(payload.iat))
		return nay(`iat required`)

	const issuedAt = tokenTime.toMs(payload.iat)
	const staleAt = issuedAt + maxAge

	if (atTime >= staleAt)
		return nay(`exceeded max age`)

	return yay(true)
}

