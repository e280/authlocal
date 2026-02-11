
import {hex} from "@e280/stz"
import {Hex, Secret} from "./types.js"

/** generate a secret key (32 character hex string) */
export function generateSecret(): Secret {
	return hex.random(32)
}

/** convert hex bytes to hash */
export function keyBytes(key: Hex) {
	const keyBytes = hex.toBytes(key)
	if (keyBytes.length !== 32)
		throw new Error("invalid hex key")
	return keyBytes
}

