
import {count, hex} from "@e280/stz"
import {seed} from "./seed/index.js"
import {address} from "./nomen/index.barrel.js"

for (const _ of count(10))
	console.log(address(hex.random(32)))

for (const _ of count(2)) {
	console.log()
	console.log(seed.from(hex.random(32)))
}
