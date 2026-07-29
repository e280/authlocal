
import {count, hex, time} from "@e280/stz"
import {demo} from "./ergo/demo.js"
import {seed} from "./ergo/seed/seed.js"
import {deriveId} from "./cryp/derive-id.js"
import {address} from "./ergo/address/address.js"
import {signDelegate} from "./alco/delegate/sign.js"
import {addressEmoji} from "./ergo/address/emoji.js"
import {addressColor} from "./ergo/address/color.js"
import {generateSecret} from "./cryp/generate-secret.js"

// const secret = generateSecret()
const secret = "da508927fa7a7c26b4abfcd7ecf63315ac21f3ded74539c496ede9b944fe7af3"
const id = deriveId(secret)

console.log("==secret==")
console.log(secret)
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





console.log("==seed==")
console.log(seed(secret))
console.log()

console.log("--------")
console.log()

for (const _ of count(10))
	console.log(address(hex.random(32)))

for (const _ of count(2)) {
	console.log()
	console.log(seed(hex.random(32)))
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
		expiresAt: time.future.hours(1),
	},
}).proofToken
console.log(jwtProof)
console.log(jwtProof.length)
console.log()

