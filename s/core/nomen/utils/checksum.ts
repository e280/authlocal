
import {sha256} from "@noble/hashes/sha2.js"

export function checksum16(buffer: Uint8Array) {
	return sha256(buffer).slice(0, 2)
}

