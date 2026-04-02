
import {hex, maybe, Maybe} from "@e280/stz"
import {addr} from "../../nomen/index.barrel.js"
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
	const reportedAddr = `${a.replace(/^@/, "")}_${b}`

	try {
		const secretBytes = new Uint8Array(wordsToBytes(secretWords))
		const secret = hex(secretBytes)
		const id = deriveId(secret)
		const address = addr(id)

		if (address.replace(/^@/, "") !== reportedAddr)
			return maybe.nay(`corruption detected, expected addr "${reportedAddr}" but got "${address}"`)

		return maybe.yay(secret)
	}
	catch {
		return maybe.nay("invalid")
	}
}
