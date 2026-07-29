
import {happy} from "@e280/stz"
import {Payload} from "../types.js"
import {tokenTime} from "../token-time.js"
import {TokenErr} from "../../errs/token-err.js"

export function assertFresh<P extends Payload>(payload: P, atTime: number, maxAge?: number) {
	if (maxAge === undefined)
		return payload

	if (!happy(payload.iat))
		throw new TokenErr(`iat required`)

	const issuedAt = tokenTime.toMs(payload.iat)
	const staleAt = issuedAt + maxAge

	if (atTime >= staleAt)
		throw new TokenErr(`exceeded max age`)

	return payload
}

