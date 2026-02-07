
import {moniker} from "./moniker.js"
import {Id} from "../../cryp/types.js"
import {delimiter} from "./parts/options.js"

export function sigil(id: Id) {
	const m = moniker(id)
	const sigil = m.split(delimiter).filter(Boolean)
	sigil.pop()
	return delimiter + sigil.join(delimiter)
}

