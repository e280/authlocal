
import {hex, txt} from "@e280/stz"
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

/** concatenate bytes, hash them, and convert to hex string */
export async function hashBytes(...chunks: Iterable<number>[]) {
	const data: number[] = []

	for (const [index, chunk] of chunks.entries()) {
		if (index !== 0) data.push(0x00)
		data.push(...chunk)
	}

	return hex.fromBytes(
		new Uint8Array(
			await crypto.subtle.digest("SHA-256", new Uint8Array(data))
		)
	)
}

export async function hashText(...texts: string[]) {
	return hashBytes(...texts.map(text => txt.toBytes(text)))
}

