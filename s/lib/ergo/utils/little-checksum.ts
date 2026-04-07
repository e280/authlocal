
import {hash} from "../../cryp/hash.js"

export function littleChecksum(buffer: Uint8Array) {
	return hash(buffer).slice(0, 2)
}

