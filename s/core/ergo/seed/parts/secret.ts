
import {maybe} from "@e280/stz"
import {parse} from "./parse.js"

export function secret(seed: string) {
	return maybe.require(parse(seed))
}

