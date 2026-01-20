
import {hex} from "@e280/stz"
import {Id} from "../cryp/types.js"
import {delimiter} from "./parts/options.js"
import {fromBytes, toBytes} from "./parts/bytes.js"

export function moniker(id: Id) {
	return fromBytes(hex.toBytes(id))
}

moniker.toHex = (moniker: string) => {
	return hex.fromBytes(toBytes(moniker))
}

moniker.sigil = (id: Id) => {
	const m = moniker(id)
	const sigil = m.split(delimiter).filter(Boolean)
	sigil.pop()
	return delimiter + sigil.join(delimiter)
}

moniker.toBytes = toBytes
moniker.fromBytes = fromBytes

