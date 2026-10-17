
import {gotValue} from "@e280/stz"
import {parseSeedphrase} from "./parse-seedphrase.js"

export function phraseToSeed(seedphrase: string) {
	return gotValue(parseSeedphrase(seedphrase))
}

