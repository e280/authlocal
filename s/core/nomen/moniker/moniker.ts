
import {hex} from "@e280/stz"
import {Id} from "../../cryp/types.js"
import {monikerMake} from "./parts/make.js"
import {monikerParse} from "./parts/parse.js"
import {problems, yoink} from "../../utils/yay.js"

export function moniker(id: Id) {
	return monikerMake(hex.toBytes(id))
}

moniker.make = monikerMake
moniker.parse = monikerParse
moniker.problem = (moniker: string) => problems(monikerParse(moniker))
moniker.toBytes = (moniker: string) => yoink(monikerParse(moniker))
moniker.toId = (text: string) => hex.fromBytes(moniker.toBytes(text))

