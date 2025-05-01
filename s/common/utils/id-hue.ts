
import {Hex} from "@e280/stz"

/** derive a hue (integer 0-359) from a hex id */
export function idHue(id: string, offset = -1) {
	const bytes = Hex.bytes(id)
	const x = bytes.at(offset)

	if (x === undefined)
		throw new Error(`id didn't have byte at ${offset}`)

	return Math.floor((x / 255) * 359)
}

