
import {hash} from "../../../index.js"

/** derive a color from a hex id */
export function color(id: string) {
	const [a, b] = [...hash("color", id)]
	const hue = (a / 255) * 360
	const chroma = (b / 255) * 0.2
	return `oklch(0.8 ${chroma} ${hue})`
}

