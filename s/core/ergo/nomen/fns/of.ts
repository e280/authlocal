
import {base58, hex} from "@e280/stz"
import {wordsFromBytes} from "../parts/words.js"
import {delimiter, sigilSize} from "../parts/options.js"
import {littleChecksum} from "../../utils/little-checksum.js"

export function of(id: string) {
	const buffer = hex.toBytes(id)
	if (buffer.length < 5) throw new Error("buffer too small")

	const checkBytes = littleChecksum(buffer)
	const sigilBytes = buffer.slice(0, sigilSize)
	const bulkBytes = buffer.slice(sigilSize)

	const sigil = [...wordsFromBytes(sigilBytes)].join(delimiter)
	const bulk = base58.fromBytes(new Uint8Array([...bulkBytes, ...checkBytes]))

	return [sigil, bulk].join(delimiter)
}

