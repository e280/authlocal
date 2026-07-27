
import {base58} from "@e280/stz"
import {hash} from "../../../cryp/hash.js"
import {keyBytes} from "../../../cryp/key-bytes.js"
import {delimiter, addrByteSize} from "./options.js"
import {wordsFromBytes} from "../../phonemes/words.js"

/** convert a hex id into an address string, looks like `gurkon_bodwyx_6xbtp7e6EWrUNGNavzF9MnuuerYcEDpEtmKoPVioXG8P` */
export function from(id: string) {
	const b = keyBytes(id)
	if (b.length !== 32) throw new Error(`invalid id length expected 32, got ${b.length} from ${id} ${id.length}`)

	const checksum = hash(id).slice(0, addrByteSize)
	const addr = [...wordsFromBytes(checksum)].join(delimiter)
	const bulk = base58.fromBytes(b)

	return addr + delimiter + bulk
}

