
import {Secret} from "../../../cryp/types.js"
import {address, keyBytes} from "../../../index.js"
import {deriveId} from "../../../cryp/derive-id.js"
import {wordsFromBytes} from "../../phonemes/words.js"

/** convert a 64-char hex string into a seed-phrase recovery-code */
export function from(secret: Secret) {
	const id = deriveId(secret)
	const secretBytes = keyBytes(secret)
	const words = [...wordsFromBytes(secretBytes)]

	const lines = [
		[address.moniker(id).replace("_", " ")],
		words.slice(0, 4),
		words.slice(4, 8),
		words.slice(8, 12),
		words.slice(12, 16),
	]

	return lines
		.map(line => line.join(" "))
		.join("\n")
}

