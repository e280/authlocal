
import {count, hex} from "@e280/stz"
import {acorn} from "../acorn.js"
import {moniker} from "../moniker.js"

for (const _ of count(10))
	console.log(moniker(hex.random(32)))

for (const _ of count(2)) {
	console.log()
	console.log(acorn(hex.random(32)))
}

