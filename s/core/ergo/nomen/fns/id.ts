
import {parse} from "./parse.js"
import {maybe} from "@e280/stz"

export function id(nomen: string) {
	return maybe.require(parse(nomen))
}

