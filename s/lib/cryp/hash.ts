
import {txt} from "@e280/stz"
import {blake3} from "@noble/hashes/blake3.js"

const delimiter = Uint8Array.of(0x00)

export function hash(...parts: (string | Uint8Array)[]) {
	const hasher = blake3.create()

	for (const [index, part] of parts.entries()) {
		const isLast = index === (parts.length - 1)

		hasher.update(
			(typeof part === "string")
				? txt.toBytes(part)
				: part
		)

		if (!isLast)
			hasher.update(delimiter)
	}

	return hasher.digest() as Uint8Array
}

