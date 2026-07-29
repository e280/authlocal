
import {gotValue} from "@e280/stz"
import {addressParse} from "./parse.js"

/** convert an address string back into a hex id */
export function addressId(address: string) {
	return gotValue(addressParse(address))
}
