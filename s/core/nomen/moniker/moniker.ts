
import {hex} from "@e280/stz"
import {Id} from "../../cryp/types.js"
import {monikerMake} from "./parts/make.js"
import {monikerParse} from "./parts/parse.js"
import {problematize, retrieve} from "../../utils/validation.js"

export function moniker(id: Id) {
	return monikerMake(hex.toBytes(id))
}

moniker.make = monikerMake
moniker.parse = monikerParse
moniker.problem = (moniker: string) => problematize(monikerParse(moniker))
moniker.toBytes = (moniker: string) => retrieve(monikerParse(moniker))
moniker.toId = (text: string) => hex.fromBytes(moniker.toBytes(text))

