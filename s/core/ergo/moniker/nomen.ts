
import {hex} from "@e280/stz"
import {Id} from "../../cryp/types.js"
import {yay, nay} from "../../utils/yay.js"
import {monikerMake} from "./parts/make.js"
import {monikerParse} from "./parts/parse.js"

export function nomen(id: Id) {
	return monikerMake(hex.toBytes(id))
}

nomen.make = monikerMake
nomen.parse = monikerParse
nomen.problems = (moniker: string) => nay.problems(monikerParse(moniker))
nomen.toBytes = (moniker: string) => yay.require(monikerParse(moniker))
nomen.toId = (text: string) => hex.fromBytes(nomen.toBytes(text))

