
import {nomen} from "./nomen.js"
import {suite, test, expect} from "@e280/science"

const demoHex = "0000deadbeefb00b82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoNomen = "nopnop_dedyak_fFzXVjwKr4BfwSEcovapQSZvrqg3EtnSNiuUFknsb"

export default suite({
	"nomen matches demo": test(async() => {
		expect(nomen(demoHex)).is(demoNomen)
	}),

	"id->nomen->id": test(async() => {
		expect(nomen.toId(nomen(demoHex))).is(demoHex)
	}),

	"invalid nomen fails": test(async() => {
		const badChars = [...demoNomen]
		badChars[24] = "X"
		const bad = badChars.join("")
		expect(() => nomen.toId(bad)).throws()
	}),
})

