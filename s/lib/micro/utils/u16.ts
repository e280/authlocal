
import {view} from "./view.js"

export function u16(n: number) {
	const b = new Uint8Array(2)
	view(b).setUint16(0, n, true)
	return b
}

