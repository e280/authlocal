
import {base58, hex} from "@e280/stz"
import {wordsFromBytes} from "../../phonemes/words.js"
import {delimiter, sigilSize} from "./options.js"
import {littleChecksum} from "../../utils/little-checksum.js"

/** convert a hex id into a nomen string, looks like `salrux_nemroy_8bEGQFbAmWUZB8Ddq4MkaBnu975sgQwW3tpRCzEAx` */
export function from(id: string) {
	const buffer = hex.toBytes(id)
	if (buffer.length < 5) throw new Error("buffer too small")

	const checkBytes = littleChecksum(buffer)
	const sigilBytes = buffer.slice(0, sigilSize)
	const bulkBytes = buffer.slice(sigilSize)

	const sigil = [...wordsFromBytes(sigilBytes)].join(delimiter)
	const bulk = base58.fromBytes(new Uint8Array([...bulkBytes, ...checkBytes]))

	return [sigil, bulk].join(delimiter)
}

