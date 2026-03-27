
import {hex, maybe, Maybe} from "@e280/stz"
import {nomen} from "../../nomen/index.js"
import {deriveId} from "../../../cryp/derive-id.js"
import {wordsToBytes} from "../../phonemes/words.js"

/** convert a seed-phrase recovery-code back into a 64-char hex string  */
export function parse(seed: string): Maybe<string> {
	const words = seed
		.trim()
		.split(/\s+/)
		.map(m => m.trim().toLowerCase())
		.filter(Boolean)

	if (words.length !== 18)
		return maybe.nay("invalid number of words")

	const [a, b, ...secretWords] = words
	const reportedSig = `${a}_${b}`

	const secretBytes = new Uint8Array(wordsToBytes(secretWords))
	const secret = hex(secretBytes)
	const id = deriveId(secret)
	const sig = nomen.nom(id)

	if (sig !== reportedSig)
		return maybe.nay(`invalid sigil, expected "${reportedSig}", but got "${sig}"`)

	return maybe.yay(secret)
}

