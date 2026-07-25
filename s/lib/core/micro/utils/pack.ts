
import {u16} from "./u16.js"

export function pack(...parts: Uint8Array[]) {
	return new Uint8Array(
		parts.flatMap(part => [...u16(part.length), ...part])
	)
}

