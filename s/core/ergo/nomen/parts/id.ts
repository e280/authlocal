
import {maybe} from "@e280/stz"
import {parse} from "./parse.js"

/** convert an address string back into a hex id */
export function id(address: string) {
	return maybe.require(parse(address))
}
