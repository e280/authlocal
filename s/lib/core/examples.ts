
import {bytes, count, hex, time} from "@e280/stz"
import {demo} from "./ergo/demo.js"
import {address, seed} from "./index.js"
import {deriveId} from "./cryp/derive-id.js"
import {microSign} from "./micro/fns/sign.js"
import {signDelegate} from "./alco/sign-delegate.js"
import {generateSecret} from "./cryp/generate-secret.js"

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
console.log()

console.log("==jwt proof token==")
const jwtProof = signDelegate({
	secret: demo.secret,
	alias: "chase",
	petitionerOrigin: "https://e280.org",
	delegatorOrigin: "https://authlocal.org",
	petition: {
		expiresAt: time.future.hours(1),
		scope: "authlocal:delegate",
	},
}).proofToken
console.log(jwtProof)
console.log(jwtProof.length)
console.log()

console.log("==micro proof token==")
const microProof = microSign(demo.secret, {
	audience: "https://e280.org",
	expiresAt: time.future.hours(1),
	payload: bytes.random(64),
})
console.log(microProof)
console.log(microProof.length)
console.log()

