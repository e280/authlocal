
import {base58, hex, Maybe, nay, yay} from "@e280/stz"
import {addressMoniker} from "./moniker.js"
import {delimiter, addrByteSize} from "./utils/options.js"

/** convert an address string back into a hex id */
export function addressParse(address: string): Maybe<string> {
	const parts = address
		.trim()
		.replace(/^@/, "")
		.replace(/^_/, "")
		.split(delimiter)
		.filter(Boolean)

	const addrReported = parts.slice(0, 2).join(delimiter)
	const bulk = parts.at(-1)

	if (bulk === undefined) return nay("bulk missing")
	if (addrReported.length !== ((addrByteSize * 3) + delimiter.length)) return nay("addr is wrong size")

	const id = hex(base58.toBytes(bulk))
	const shortActual = addressMoniker(id)

	if (addrReported !== shortActual)
		return nay(`corruption detected, failed checksum`)

	return yay(id)
}

