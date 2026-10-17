
import {gotValue} from "@e280/stz"
import {parseSeedphrase} from "./parse-seedphrase.js"

/** convert a seed-phrase recovery-code back into a 64-char hex string  */
export function seedphraseToSecret(seedphrase: string) {
	return gotValue(parseSeedphrase(seedphrase))
}

