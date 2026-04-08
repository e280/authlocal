
import {count, hex} from "@e280/stz"
import {seed} from "./seed/index.js"
import {address} from "./address/index.js"
import {deriveId} from "../cryp/derive-id.js"
import {generateSecret} from "../cryp/generate-secret.js"

const secret = generateSecret()
const id = deriveId(secret)

console.log("==secret==")
console.log(secret)
console.log()

console.log("==id==")
console.log(id)
console.log()

console.log("==address==")
console.log(address.from(id))
console.log()


console.log("==seed==")
console.log(seed.from(secret))
console.log()

console.log("--------")
console.log()

for (const _ of count(10))
	console.log(address.from(hex.random(32)))

for (const _ of count(2)) {
	console.log()
	console.log(seed.from(hex.random(32)))
}
