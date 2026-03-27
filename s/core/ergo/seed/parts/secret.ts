
import {maybe} from "@e280/stz"
import {parse} from "./parse.js"

/** convert a seed-phrase recovery-code back into a 64-char hex string  */
export function secret(seed: string) {
	return maybe.require(parse(seed))
}

