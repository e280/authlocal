
import {count, hex} from "@e280/stz"
import {seed} from "./seed/index.js"
import {address} from "./address/index.js"

for (const _ of count(10))
	console.log(address.from(hex.random(32)))

for (const _ of count(2)) {
	console.log()
	console.log(seed.from(hex.random(32)))
}
