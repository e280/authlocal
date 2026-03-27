
import {count, hex} from "@e280/stz"
import {seed} from "./seed/seed.js"
import {nomen} from "./nomen/index.js"

for (const _ of count(10))
	console.log(nomen.of(hex.random(32)))

for (const _ of count(2)) {
	console.log()
	console.log(seed(hex.random(32)))
}

