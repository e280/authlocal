
import {view} from "./view.js"

export function i64(n: number) {
	const b = new Uint8Array(8)
	view(b).setBigInt64(0, BigInt(n), true)
	return b
}

