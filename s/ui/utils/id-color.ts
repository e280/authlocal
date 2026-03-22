
import {hex} from "@e280/stz"

/** derive a color from a hex id */
export function idColor(id: string, byteIndex = -1) {
	return `oklch(1 0.2 ${idHue(id, byteIndex)})`
}

/** derive a hue (integer 0-359) from a hex id */
function idHue(id: string, byteIndex = -1) {
	const binary = hex.toBytes(id)
	const x = binary.at(byteIndex)

	if (x === undefined)
		throw new Error(`id didn't have byte at ${byteIndex}`)

	return Math.floor((x / 255) * 359)
}

