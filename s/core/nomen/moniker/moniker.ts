
import {hex} from "@e280/stz"
import {Id} from "../../cryp/types.js"
import {yay, nay} from "../../utils/yay.js"
import {monikerMake} from "./parts/make.js"
import {monikerParse} from "./parts/parse.js"

export function moniker(id: Id) {
	return monikerMake(hex.toBytes(id))
}

moniker.make = monikerMake
moniker.parse = monikerParse
moniker.problem = (moniker: string) => nay.problems(monikerParse(moniker))
moniker.toBytes = (moniker: string) => yay.require(monikerParse(moniker))
moniker.toId = (text: string) => hex.fromBytes(moniker.toBytes(text))

