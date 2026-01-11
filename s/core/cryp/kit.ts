
import {hex} from "@e280/stz"

export function keyBytes(key: string) {
	const keyBytes = hex.toBytes(key)
	if (keyBytes.length !== 32)
		throw new Error("invalid hex key")
	return keyBytes
}

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

