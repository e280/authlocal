
import {hex, maybe, Maybe} from "@e280/stz"
import {deriveId} from "../../cryp/derive-id.js"
import {wordsToBytes} from "../phonemes/words.js"
import {addressMoniker} from "../address/moniker.js"

/** convert a seed-phrase recovery-code back into a 64-char hex string  */
export function seedParse(seed: string): Maybe<string> {
	const words = seed
		.trim()
		.split(/\s+/)
		.map(m => m.trim().toLowerCase())
		.filter(Boolean)

	if (words.length !== 18)
		return maybe.nay("invalid number of words")

	const [a, b, ...secretWords] = words
	const reportedShort = `${a.replace(/^@/, "")}_${b}`

	try {
		const secretBytes = new Uint8Array(wordsToBytes(secretWords))
		const secret = hex(secretBytes)
		const id = deriveId(secret)
		const actualShort = addressMoniker(id)

		if (actualShort.replace(/^@/, "") !== reportedShort)
			return maybe.nay(`corruption detected, expected "${reportedShort}" but got "${actualShort}"`)

		return maybe.yay(secret)
	}
	catch {
		return maybe.nay("invalid")
	}
}
