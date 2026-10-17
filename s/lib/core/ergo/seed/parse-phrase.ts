
import {hex, yay, nay, Maybe} from "@e280/stz"
import {seedToSecret} from "./seed-to-secret.js"
import {deriveId} from "../../cryp/derive-id.js"
import {wordsToBytes} from "../phonemes/words.js"
import {addressMoniker} from "../address/moniker.js"

/** convert phrase into seed hex. */
export function parsePhrase(seedphrase: string): Maybe<string> {
	const words = seedphrase
		.trim()
		.split(/\s+/)
		.map(m => m.trim().toLowerCase())
		.filter(Boolean)

	if (words.length !== 10 && words.length !== 18)
		return nay("expected 10 or 18 words")

	try {
		const [a, b, ...secretWords] = words
		const reportedMoniker = `${a}_${b}`
		const secretBytes = new Uint8Array(wordsToBytes(secretWords))
		const seed = hex(secretBytes)

		const secret256 = seedToSecret(seed)
		const id = deriveId(secret256)
		const actualMoniker = addressMoniker(id)

		if (reportedMoniker !== actualMoniker)
			return nay(`corruption detected, expected "${reportedMoniker}" but got "${actualMoniker}"`)

		return yay(seed)
	}
	catch {
		return nay("invalid")
	}
}

