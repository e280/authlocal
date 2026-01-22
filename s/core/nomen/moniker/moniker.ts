
import {hex} from "@e280/stz"
import {Id} from "../../cryp/types.js"
import {delimiter} from "./parts/options.js"
import {monikerFromBytes} from "./parts/make.js"
import {monikerProblem, monikerToBytes, monikerParse} from "./parts/parse.js"

export function moniker(id: Id) {
	return monikerFromBytes(hex.toBytes(id))
}

moniker.toHex = (moniker: string) => hex.fromBytes(monikerToBytes(moniker))

moniker.sigil = (id: Id) => {
	const m = moniker(id)
	const sigil = m.split(delimiter).filter(Boolean)
	sigil.pop()
	return delimiter + sigil.join(delimiter)
}

moniker.parse = monikerParse
moniker.problem = monikerProblem
moniker.toBytes = monikerToBytes
moniker.fromBytes = monikerFromBytes

