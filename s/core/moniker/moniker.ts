
import {base58, hex} from "@e280/stz"
import {motesFromBytes, motesToBytes} from "./parts/motes.js"

const sigilSize = 4
const delimiter = "_"

function fromBytes(buffer: Uint8Array) {
	if (buffer.length < 5) throw new Error("buffer too small for moniker")

	const sigilBytes = buffer.slice(0, sigilSize)
	const bulkBytes = buffer.slice(sigilSize)

	const sigil = delimiter + [...motesFromBytes(sigilBytes)].join(delimiter)
	const bulk = base58.fromBytes(bulkBytes)

	return [sigil, bulk].join(delimiter)
}

function toBytes(moniker: string) {
	const sigil = moniker.split(delimiter).filter(Boolean)
	const bulk = sigil.pop()

	if (bulk === undefined) throw new Error("bulk missing")
	if (sigil.length * 2 !== sigilSize) throw new Error("invalid sigil size")

	return new Uint8Array([
		...motesToBytes(sigil),
		...base58.toBytes(bulk),
	])
}

export function moniker(hexString: string) {
	return fromBytes(hex.toBytes(hexString))
}

moniker.toHex = (monikerString: string) => {
	return hex.fromBytes(toBytes(monikerString))
}

moniker.sigil = (hexString: string) => {
	const m = moniker(hexString)
	const sigil = m.split(delimiter).filter(Boolean)
	sigil.pop()
	return delimiter + sigil.join(delimiter)
}

moniker.fromBytes = fromBytes
moniker.toBytes = toBytes

