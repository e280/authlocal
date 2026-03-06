
import {sha256} from "@noble/hashes/sha2.js"

export function littleChecksum(buffer: Uint8Array) {
	return sha256(buffer).slice(0, 2)
}

