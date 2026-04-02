
import {base58, bytes, hex, Maybe, maybe} from "@e280/stz"
import {delimiter, nomByteSize} from "./options.js"
import {wordsToBytes} from "../../phonemes/words.js"
import {littleChecksum} from "../../utils/little-checksum.js"

/** convert an address string back into a hex id */
export function parse(address: string): Maybe<string> {
	const parts = address
		.trim()
		.replace(/^@/, "")
		.split(delimiter)
		.filter(Boolean)
	const addr = parts.slice(0, 2)
	const bulk = parts.pop()

	if (bulk === undefined) return maybe.nay("bulk missing")
	if ((addr.length * 2) !== nomByteSize) return maybe.nay("addr is wrong size")

	const buffer = new Uint8Array([
		...wordsToBytes(addr),
		...base58.toBytes(bulk),
	])

	const body = buffer.slice(0, buffer.length - 2)
	const check = buffer.slice(buffer.length - 2)

	if (!bytes.eq(check, littleChecksum(body)))
		return maybe.nay("corruption detected, failed checksum")

	return maybe.yay(hex(body))
}
