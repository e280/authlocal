
import {bytes, hex} from "@e280/stz"
import {sha256} from "@noble/hashes/sha2.js"

import {Root} from "../../cryp/types.js"
import {checksum16} from "../utils/checksum.js"
import {yay, nay, problems, yoink} from "../../utils/yep.js"
import {wordsFromBytes, wordsToBytes} from "../moniker/parts/words.js"

export function acorn(root: Root) {
	const rootBytes = hex.toBytes(root)
	const checksumBytes = sha256(rootBytes).slice(0, 2)

	const words = [
		...wordsFromBytes(rootBytes),
		...wordsFromBytes(checksumBytes),
	]

	const lines = [
		words.slice(0, 4),
		words.slice(4, 8),
		words.slice(8, 12),
		words.slice(12, 16),
		words.slice(16, 17),
	]

	return lines
		.map(line => line.join(" "))
		.join("\n")
}

acorn.parse = (text: string) => {
	const words = text
		.trim()
		.split(/\s+/)
		.map(m => m.trim().toLowerCase())
		.filter(Boolean)

	if (words.length !== 17)
		return nay("invalid number of words")

	const reportedChecksumBytes = new Uint8Array(wordsToBytes([words.pop()!]))
	const rootBytes = new Uint8Array(wordsToBytes(words))
	const checksumBytes = checksum16(rootBytes)

	if (!bytes.eq(reportedChecksumBytes, checksumBytes))
		return nay("invalid checksum")

	return yay(hex.fromBytes(rootBytes))
}

acorn.problem = (text: string) => problems(acorn.parse(text))
acorn.toRoot = (text: string) => yoink(acorn.parse(text))

