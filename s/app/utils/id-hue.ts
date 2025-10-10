
import {hex} from "@e280/stz"

/** derive a hue (integer 0-359) from a hex id */
export function idHue(id: string, byteIndex = -1) {
	const binary = hex.toBytes(id)
	const x = binary.at(byteIndex)

	if (x === undefined)
		throw new Error(`id didn't have byte at ${byteIndex}`)

	return Math.floor((x / 255) * 359)
}

/** derive an hsl color from a hex id */
export function idHsl(id: string, byteIndex = -1) {
	return `hsl(${idHue(id, byteIndex)}deg, 100%, 75%)`
}

