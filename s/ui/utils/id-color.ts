
import {hex} from "@e280/stz"

/** derive a color from a hex id */
export function idColor(id: string) {
	const hue = toDegrees(byteValue(id, -1))
	const chroma = byteValue(id, -2) * 0.3
	return `oklch(1 ${chroma} ${hue})`
}

function byteValue(id: string, index: number) {
	const binary = hex.toBytes(id)
	const byte = binary.at(index)
	if (byte === undefined)
		throw new Error(`id didn't have byte at ${index}`)
	return byte / 255
}

function toDegrees(x: number) {
	return Math.floor(x * 359)
}

