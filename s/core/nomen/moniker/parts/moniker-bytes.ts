
import {base58, bytes} from "@e280/stz"
import {checksum16} from "../../utils/checksum.js"
import {delimiter, sigilSize} from "./options.js"
import {wordsFromBytes, wordsToBytes} from "./words.js"

export function monikerFromBytes(buffer: Uint8Array) {
	if (buffer.length < 5) throw new Error("buffer too small for moniker")

	const checkBytes = checksum16(buffer)
	const sigilBytes = buffer.slice(0, sigilSize)
	const bulkBytes = buffer.slice(sigilSize)

	const sigil = delimiter + [...wordsFromBytes(sigilBytes)].join(delimiter)
	const bulk = base58.fromBytes(new Uint8Array([...bulkBytes, ...checkBytes]))

	return [sigil, bulk].join(delimiter)
}

export function monikerToBytes(moniker: string) {
	const sigil = moniker.split(delimiter).filter(Boolean)
	const bulk = sigil.pop()

	if (bulk === undefined) throw new Error("bulk missing")
	if (sigil.length * 2 !== sigilSize) throw new Error("invalid sigil size")

	const buffer = new Uint8Array([
		...wordsToBytes(sigil),
		...base58.toBytes(bulk),
	])

	const body = buffer.slice(0, buffer.length - 2)
	const check = buffer.slice(buffer.length - 2)

	if (!bytes.eq(check, checksum16(body)))
		throw new Error("invalid")

	return body
}

