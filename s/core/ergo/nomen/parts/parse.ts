
import {base58, bytes, hex, Maybe, maybe} from "@e280/stz"
import {delimiter, nomByteSize} from "./options.js"
import {wordsToBytes} from "../../phonemes/words.js"
import {littleChecksum} from "../../utils/little-checksum.js"

/** convert a nomen string back into a hex id */
export function parse(nomen: string): Maybe<string> {
	const nom = nomen.split(delimiter).filter(Boolean)
	const bulk = nom.pop()

	if (bulk === undefined) return maybe.nay("bulk missing")
	if ((nom.length * 2) !== nomByteSize) return maybe.nay("nom is wrong size")

	const buffer = new Uint8Array([
		...wordsToBytes(nom),
		...base58.toBytes(bulk),
	])

	const body = buffer.slice(0, buffer.length - 2)
	const check = buffer.slice(buffer.length - 2)

	if (!bytes.eq(check, littleChecksum(body)))
		return maybe.nay("corruption detected, failed checksum")

	return maybe.yay(hex(body))
}

