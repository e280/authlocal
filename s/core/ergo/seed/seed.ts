
import {hex, maybe, nay, yay} from "@e280/stz"
import {nomen} from "../nomen/index.js"
import {Secret} from "../../cryp/types.js"
import {deriveId} from "../../cryp/derive-id.js"
import {wordsFromBytes, wordsToBytes} from "../nomen/parts/words.js"

export function seed(secret: Secret) {
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

seed.parse = (text: string) => {
	const words = text
		.trim()
		.split(/\s+/)
		.map(m => m.trim().toLowerCase())
		.filter(Boolean)

	if (words.length !== 18)
		return nay("invalid number of words")

	const [a, b, ...secretWords] = words
	const reportedSig = `${a}_${b}`

	const secretBytes = new Uint8Array(wordsToBytes(secretWords))
	const secret = hex(secretBytes)
	const id = deriveId(secret)
	const sig = nomen.nom(id)

	if (sig !== reportedSig)
		return nay(`invalid sigil, expected "${reportedSig}", but got "${sig}"`)

	return yay(secret)
}

seed.problems = (text: string) => maybe.problems(seed.parse(text))
seed.toSecret = (text: string) => maybe.require(seed.parse(text))

