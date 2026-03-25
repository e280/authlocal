
import {base58, bytes} from "@e280/stz"
import {wordsToBytes} from "./words.js"
import {yay, nay} from "../../../utils/yay.js"
import {delimiter, sigilSize} from "./options.js"
import {littleChecksum} from "../../utils/little-checksum.js"

export function monikerParse(moniker: string) {
	const sigil = moniker.split(delimiter).filter(Boolean)
	const bulk = sigil.pop()

	if (bulk === undefined) return nay("bulk missing")
	if ((sigil.length * 2) !== sigilSize) return nay("sigil is wrong size")

	const buffer = new Uint8Array([
		...wordsToBytes(sigil),
		...base58.toBytes(bulk),
	])

	const body = buffer.slice(0, buffer.length - 2)
	const check = buffer.slice(buffer.length - 2)

	if (!bytes.eq(check, littleChecksum(body)))
		return nay("failed checksum, typo detected")

	return yay(body)
}

