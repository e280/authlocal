
import {parse} from "./parse.js"
import {maybe} from "@e280/stz"

/** convert a nomen string back into a hex id */
export function id(nomen: string) {
	return maybe.require(parse(nomen))
}

