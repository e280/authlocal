
import {Secret} from "../../cryp/types.js"
import {deriveId} from "../../cryp/derive-id.js"
import {keyBytes} from "../../cryp/key-bytes.js"
import {wordsFromBytes} from "../phonemes/words.js"
import {addressMoniker} from "../address/moniker.js"

/** convert a 64-char hex string into a seed-phrase recovery-code */
export function seed(secret: Secret) {
	const id = deriveId(secret)
	const secretBytes = keyBytes(secret)
	const words = [...wordsFromBytes(secretBytes)]

	const lines = [
		[addressMoniker(id).replace("_", " ")],
		words.slice(0, 4),
		words.slice(4, 8),
		words.slice(8, 12),
		words.slice(12, 16),
	]

	return lines
		.map(line => line.join(" "))
		.join("\n")
}

