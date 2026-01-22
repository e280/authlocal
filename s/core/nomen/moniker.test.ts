
import {moniker} from "./moniker.js"
import {suite, test, expect} from "@e280/science"

const demoHex = "00008c9ed773c49e82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoMoniker = "_nopnop_tobmok_kAucaLDi8Poii3cAnHx8iCyPLYvmM2x8G4BtUGtwh"

export default suite({
	"moniker matches demo": test(async() => {
		expect(moniker(demoHex)).is(demoMoniker)
	}),

	"id->moniker->id": test(async() => {
		expect(moniker.toHex(moniker(demoHex))).is(demoHex)
	}),

	"invalid moniker fails": test(async() => {
		const badChars = [...demoMoniker]
		badChars[24] = "X"
		const bad = badChars.join("")
		expect(() => moniker.toHex(bad)).throws()
	}),
})

