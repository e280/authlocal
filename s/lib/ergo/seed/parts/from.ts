
import {hex} from "@e280/stz"
import {address} from "../../address/index.js"
import {Secret} from "../../../cryp/types.js"
import {deriveId} from "../../../cryp/derive-id.js"
import {wordsFromBytes} from "../../phonemes/words.js"

/** convert a 64-char hex string into a seed-phrase recovery-code */
export function from(secret: Secret) {
	const id = deriveId(secret)
	const secretBytes = hex.toBytes(secret)
	const words = [...wordsFromBytes(secretBytes)]

	const lines = [
		[address.addr(id).replace("_", " ")],
		words.slice(0, 4),
		words.slice(4, 8),
		words.slice(8, 12),
		words.slice(12, 16),
	]

	return lines
		.map(line => line.join(" "))
		.join("\n")
}
