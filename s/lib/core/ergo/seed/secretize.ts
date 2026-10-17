
import {hex, txt} from "@e280/stz"
import {blake3} from "@awasm/noble"

const dkLen = 32
const context = txt.toBytes("authlocal/seed128/v1")

/** convert a seed hex (32 or 64 chars) into a full secret hex (64 chars). */
export function secretize(seed: string) {
	const bytes = hex.toBytes(seed)

	// seed is already 256-bit secret.
	if (bytes.length === 32)
		return seed

	// expand 128-bit seed to 256-bit secret.
	else if (bytes.length === 16)
		return hex(blake3(bytes, {dkLen, context}))

	// throw error for any unexpected sized seed.
	else
		throw new Error(`expected 128-bit secret`)
}

