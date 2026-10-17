
import {hex} from "@e280/stz"
import {Seed} from "../types.js"
import {secretize} from "./secretize.js"
import {deriveId} from "../../cryp/derive-id.js"
import {wordsFromBytes} from "../phonemes/words.js"
import {addressMoniker} from "../address/moniker.js"

/** convert seed hex to seedphrase words text. */
export function seedphrase(seed: Seed) {
	const secret = secretize(seed)
	const id = deriveId(secret)
	const moniker = addressMoniker(id)

	const seedBytes = hex.toBytes(seed)
	const words = [...wordsFromBytes(seedBytes)]

	const lines = (() => {
		if (words.length === 8) // 128-bit
			return [
				[moniker.replace("_", " ")],
				words.slice(0, 4),
				words.slice(4, 8),
			]
		else if (words.length === 16) // 256-bit
			return [
				[moniker.replace("_", " ")],
				words.slice(0, 4),
				words.slice(4, 8),
				words.slice(8, 12),
				words.slice(12, 16),
			]
		else
			throw new Error(`invalid seed length ${words.length}`)
	})()

	return lines
		.map(line => line.join(" "))
		.join("\n")
}

