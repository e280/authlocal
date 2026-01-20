
import {hex} from "@e280/stz"
import {delimiter} from "./parts/options.js"
import {fromBytes, toBytes} from "./parts/bytes.js"

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

