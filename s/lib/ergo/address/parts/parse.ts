
import {base58, hex, Maybe, maybe} from "@e280/stz"
import {addr} from "./addr.js"
import {delimiter, addrByteSize} from "./options.js"

/** convert an address string back into a hex id */
export function parse(address: string): Maybe<string> {
	const parts = address
		.trim()
		.replace(/^@/, "")
		.replace(/^_/, "")
		.split(delimiter)
		.filter(Boolean)

	const addrReported = parts.slice(0, 2).join(delimiter)
	const bulk = parts.at(-1)

	if (bulk === undefined) return maybe.nay("bulk missing")
	if (addrReported.length !== ((addrByteSize * 3) + delimiter.length)) return maybe.nay("addr is wrong size")

	const id = hex(base58.toBytes(bulk))
	const addrActual = addr(id)

	if (addrReported !== addrActual)
		return maybe.nay(`corruption detected, failed checksum`)

	return maybe.yay(id)
}

