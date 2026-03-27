
import {from} from "./from.js"

export function nom(id: string) {
	return from(id).slice(0, 13)
}

