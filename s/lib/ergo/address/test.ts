
import {demo} from "../demo.js"
import {address} from "./index.js"
import {suite, test, expect} from "@e280/science"

export default suite({
	"address matches demo": test(async() => {
		expect(address.from(demo.id)).is(demo.address)
	}),

	"id->address->id": test(async() => {
		expect(address.id(address.from(demo.id))).is(demo.id)
	}),

	"invalid address fails": test(async() => {
		const badChars = [...demo.address]
		badChars[24] = "X"
		const bad = badChars.join("")
		expect(() => address.id(bad)).throws()
	}),
})

