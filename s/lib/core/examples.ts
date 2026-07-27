
import {bytes, count, hex, time, txt} from "@e280/stz"
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
const jwtProof = signDelegate(demo.root, {
	atTime: Date.now(),
	alias: "chase",
	appOrigin: "https://e280.org",
	delegatorOrigin: "https://authlocal.org",
	petition: {
		purpose: "test",
		scope: generateSecret(),
		expiresAt: time.future.hours(1),
	},
}).proofToken
console.log(jwtProof)
console.log(jwtProof.length)
console.log()

console.log("==micro proof token==")
const microProof = microSign(demo.root, {
	payload: txt.toBytes(JSON.stringify({
		petition: {
			alias: "chase",
			purpose: "test",
			scope: generateSecret(),
			expiresAt: time.future.hours(1),
		},
	})),
	issuer: "https://authlocal.org",
	audience: "https://e280.org",
	expiresAt: time.future.hours(1),
})
console.log(microProof)
console.log(microProof.length)
console.log()

