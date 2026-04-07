
import {from} from "./from.js"

/** convert a hex id into a truncated address string, looks like "@salrux_nemroy" */
export function addr(id: string) {
	return from(id).slice(0, 14)
}
