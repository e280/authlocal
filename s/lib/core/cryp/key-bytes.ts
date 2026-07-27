
import {hex} from "@e280/stz"
import {Hex} from "./types.js"

/** convert hex key to bytes */
export function keyBytes(key: Hex) {
	const keyBytes = hex.toBytes(key)

	if (keyBytes.length !== 32)
		throw new Error("invalid hex key")

	return keyBytes
}

