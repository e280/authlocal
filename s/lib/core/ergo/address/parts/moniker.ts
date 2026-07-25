
import {from} from "./from.js"

/** convert a hex id into a truncated address string, looks like `gurkon_bodwyx` */
export function moniker(id: string) {
	return from(id).slice(0, 13)
}

