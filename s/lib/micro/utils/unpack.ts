
import {view} from "./view.js"

export function* unpack(buffer: Uint8Array) {
	const v = view(buffer)
	let o = 0

	while (o < buffer.length) {
		const length = v.getUint16(o, true)
		o += 2
		yield buffer.slice(o, o + length)
		o += length
	}
}

