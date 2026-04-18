
import {base58, txt} from "@e280/stz"
import {view} from "../utils/view.js"
import {unpack} from "../utils/unpack.js"

export function microDecode(token: string) {
	const [message58, signature58] = token.split("_")
	const message = base58.toBytes(message58)
	const signature = base58.toBytes(signature58)
	const version = message.slice(0, 1).at(0)!
	const [bExpiry, bAudience, payload] = unpack(message.slice(1))
	const expiresAt = 1000 * Number(view(bExpiry).getBigInt64(0, true))
	const audience = txt.fromBytes(bAudience)
	return {message, signature, version, payload, expiresAt, audience}
}

