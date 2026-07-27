
import {txt} from "@e280/stz"
import {blake3} from "@awasm/noble"

export function hash(...parts: (string | Uint8Array)[]) {
	const hasher = blake3.create()

	for (const part of parts) {
		const bytes = typeof part === "string"
			? txt.toBytes(part)
			: part

		const length = new Uint8Array(4)
		new DataView(length.buffer).setUint32(0, bytes.length)

		hasher.update(length)
		hasher.update(bytes)
	}

	return hasher.digest() as Uint8Array
}

