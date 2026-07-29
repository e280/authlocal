
import {suite, test, expect} from "@e280/science"
import {demo} from "../demo.js"
import {addressId} from "./id.js"
import {address} from "./address.js"

export default suite({
	"address matches demo": test(async() => {
		expect(address(demo.id)).is(demo.address)
	}),

	"id->address->id": test(async() => {
		expect(addressId(address(demo.id))).is(demo.id)
	}),

	"invalid address fails": test(async() => {
		const badChars = [...demo.address]
		badChars[24] = "X"
		const bad = badChars.join("")
		expect(() => addressId(bad)).throws()
	}),
})

