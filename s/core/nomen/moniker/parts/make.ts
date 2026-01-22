
import {base58} from "@e280/stz"
import {wordsFromBytes} from "./words.js"
import {delimiter, sigilSize} from "./options.js"
import {checksum16} from "../../utils/checksum.js"

export function monikerFromBytes(buffer: Uint8Array) {
	if (buffer.length < 5) throw new Error("buffer too small for moniker")

	const checkBytes = checksum16(buffer)
	const sigilBytes = buffer.slice(0, sigilSize)
	const bulkBytes = buffer.slice(sigilSize)

	const sigil = delimiter + [...wordsFromBytes(sigilBytes)].join(delimiter)
	const bulk = base58.fromBytes(new Uint8Array([...bulkBytes, ...checkBytes]))

	return [sigil, bulk].join(delimiter)
}

