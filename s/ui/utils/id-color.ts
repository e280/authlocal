
import {hash} from "../../lib/index.js"

/** derive a color from a hex id */
export function idColor(id: string) {
	const [a, b] = values(id, 2)
	const hue = a * 360
	const chroma = b * 0.2
	return `oklch(0.8 ${chroma} ${hue})`
}

function values(id: string, length: number) {
	return [...hash(id)]
		.slice(0, length)
		.map(byte => byte / 255)
}

