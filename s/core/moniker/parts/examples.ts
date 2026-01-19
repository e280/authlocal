
import {count, hex} from "@e280/stz"
import {moniker} from "../moniker.js"

for (const _ of count(10))
	console.log(moniker(hex.random(32)))

