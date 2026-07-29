
import {address} from "./address.js"

/** convert a hex id into a truncated address string, looks like `gurkon_bodwyx` */
export function addressMoniker(id: string) {
	return address(id).slice(0, 13)
}

