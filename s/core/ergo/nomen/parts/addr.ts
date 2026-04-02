
import {address} from "./address.js"

/** convert a hex id into a truncated address string, looks like "@salrux_nemroy" */
export function addr(id: string) {
	return address(id).slice(0, 14)
}
