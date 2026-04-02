
import {base58, hex} from "@e280/stz"
import {delimiter, nomByteSize} from "./options.js"
import {wordsFromBytes} from "../../phonemes/words.js"
import {littleChecksum} from "../../utils/little-checksum.js"

/** convert a hex id into an address string, looks like `@salrux_nemroy_8bEGQFbAmWUZB8Ddq4MkaBnu975sgQwW3tpRCzEAx` */
export function address(id: string) {
	const buffer = hex.toBytes(id)
	if (buffer.length < 5) throw new Error("id too small")

	const checkBytes = littleChecksum(buffer)
	const sigilBytes = buffer.slice(0, nomByteSize)
	const bulkBytes = buffer.slice(nomByteSize)

	const sigil = [...wordsFromBytes(sigilBytes)].join(delimiter)
	const bulk = base58.fromBytes(new Uint8Array([...bulkBytes, ...checkBytes]))

	return `@${[sigil, bulk].join(delimiter)}`
}
