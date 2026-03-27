
import {hex} from "@e280/stz"
import {nomen} from "../../nomen/index.js"
import {Secret} from "../../../cryp/types.js"
import {deriveId} from "../../../cryp/derive-id.js"
import {wordsFromBytes} from "../../phonemes/words.js"

export function from(secret: Secret) {
	const id = deriveId(secret)
	const secretBytes = hex.toBytes(secret)
	const words = [...wordsFromBytes(secretBytes)]

	const lines = [
		[nomen.nom(id).replace("_", " ")],
		words.slice(0, 4),
		words.slice(4, 8),
		words.slice(8, 12),
		words.slice(12, 16),
	]

	return lines
		.map(line => line.join(" "))
		.join("\n")
}

