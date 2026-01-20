
import {base58} from "@e280/stz"
import {delimiter, sigilSize} from "./options.js"
import {motesFromBytes, motesToBytes} from "./motes.js"

export function fromBytes(buffer: Uint8Array) {
	if (buffer.length < 5) throw new Error("buffer too small for moniker")

	const sigilBytes = buffer.slice(0, sigilSize)
	const bulkBytes = buffer.slice(sigilSize)

	const sigil = delimiter + [...motesFromBytes(sigilBytes)].join(delimiter)
	const bulk = base58.fromBytes(bulkBytes)

	return [sigil, bulk].join(delimiter)
}

export function toBytes(moniker: string) {
	const sigil = moniker.split(delimiter).filter(Boolean)
	const bulk = sigil.pop()

	if (bulk === undefined) throw new Error("bulk missing")
	if (sigil.length * 2 !== sigilSize) throw new Error("invalid sigil size")

	return new Uint8Array([
		...motesToBytes(sigil),
		...base58.toBytes(bulk),
	])
}

