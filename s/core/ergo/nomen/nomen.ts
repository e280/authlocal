
import {hex, maybe} from "@e280/stz"
import {Id} from "../../cryp/types.js"
import {monikerMake} from "./parts/make.js"
import {monikerParse} from "./parts/parse.js"

export function nomen(id: Id) {
	return monikerMake(hex.toBytes(id))
}

nomen.make = monikerMake
nomen.parse = monikerParse
nomen.problems = (moniker: string) => maybe.problems(monikerParse(moniker))
nomen.toBytes = (moniker: string) => maybe.require(monikerParse(moniker))
nomen.toId = (text: string) => hex.fromBytes(nomen.toBytes(text))

