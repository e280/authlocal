
import {hex} from "@e280/stz"
import {Hex} from "./types.js"

/** convert hex bytes to hash */
export function keyBytes(key: Hex) {
	const keyBytes = hex.toBytes(key)
	if (keyBytes.length !== 32)
		throw new Error("invalid hex key")
	return keyBytes
}

/** concatenate bytes, hash them, and convert to hex string */
export async function hashCat(...byteGroups: Iterable<number>[]) {
	const data: number[] = []

	for (const [index, byteGroup] of byteGroups.entries()) {
		if (index !== 0) data.push(0x00)
		data.push(...byteGroup)
	}

	return hex.fromBytes(
		new Uint8Array(
			await crypto.subtle.digest("SHA-256", new Uint8Array(data))
		)
	)
}

