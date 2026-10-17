
import {gotValue} from "@e280/stz"
import {parsePhrase} from "./parse-phrase.js"

/** convert a seed-phrase recovery-code back into a 64-char hex string  */
export function phraseToSecret(seedphrase: string) {
	return gotValue(parsePhrase(seedphrase))
}

