
import {hex} from "../../tools/hex.js"
import {getCrypto} from "./get-crypto.js"

export async function randomId(bytes = 32) {
	const crypto = await getCrypto()
	const uints = new Uint8Array(bytes)
	crypto.getRandomValues(uints)
	return hex.from.buffer(uints.buffer)
}

