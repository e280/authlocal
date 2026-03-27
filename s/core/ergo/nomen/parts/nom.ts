
import {from} from "./from.js"

/** convert a hex id into a truncated nomen string, looks like "salrux_nemroy" */
export function nom(id: string) {
	return from(id).slice(0, 13)
}

