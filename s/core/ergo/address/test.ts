
import {address} from "./index.js"
import {suite, test, expect} from "@e280/science"

const demoHex = "0000deadbeefb00b82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoAddress = "@nopnop_dedyak_fFzXVjwKr4BfwSEcovapQSZvrqg3EtnSNiuUFknsb"

export default suite({
	"address matches demo": test(async() => {
		expect(address.from(demoHex)).is(demoAddress)
	}),

	"id->address->id": test(async() => {
		expect(address.id(address.from(demoHex))).is(demoHex)
	}),

	"invalid address fails": test(async() => {
		const badChars = [...demoAddress]
		badChars[24] = "X"
		const bad = badChars.join("")
		expect(() => address.id(bad)).throws()
	}),
})
