
import {count, futureHours, hex} from "@e280/stz"
import {demo} from "./ergo/demo.js"
import {seedId} from "./ergo/seed/seed-id.js"
import {address} from "./ergo/address/address.js"
import {signDelegate} from "./alco/delegate/sign.js"
import {addressEmoji} from "./ergo/address/emoji.js"
import {addressColor} from "./ergo/address/color.js"
import {seedphrase} from "./ergo/seed/seedphrase.js"
import {generateSecret} from "./cryp/generate-secret.js"
import { secretize } from "./ergo/seed/secretize.js"

const seed = "5566ff64bc2bc5064764471d444dbfde"
const id = seedId(seed)

console.log("==seed==")
console.log(seed)
console.log()

console.log("==id==")
console.log(id)
console.log()

console.log("==address==")
console.log(address(id))
console.log()

console.log("==emoji==")
console.log(addressEmoji(id))
console.log()

console.log("==color==")
console.log(addressColor(id))
console.log()

console.log("==seedphrase==")
console.log(seedphrase(seed))
console.log()

console.log("==seedphrase long==")
console.log(seedphrase(secretize(seed)))
console.log()

console.log("--------")
console.log()

for (const _ of count(10))
	console.log(address(hex.random(32)))

for (const _ of count(2)) {
	console.log()
	console.log(seedphrase(hex.random(16)))
}
console.log()

console.log("==jwt proof token==")
const jwtProof = signDelegate(demo.secret, {
	atTime: Date.now(),
	alias: "chase",
	audience: "https://e280.org",
	issuer: "https://authlocal.org",
	petition: {
		purpose: "test",
		scope: generateSecret(),
		expiresAt: futureHours(1),
	},
}).proofToken
console.log(jwtProof)
console.log(jwtProof.length)
console.log()

