
import {gotValue} from "@e280/stz"
import {seedParse} from "./parse.js"

/** convert a seed-phrase recovery-code back into a 64-char hex string  */
export function seedSecret(seed: string) {
	return gotValue(seedParse(seed))
}

