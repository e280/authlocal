
import {moniker} from "./moniker.js"
import {suite, test, expect} from "@e280/science"

const demoId = "f3438c9ed773c49e82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoMoniker = "_namnut_nibfer_3DXZjNmfcKLWD4mdHK58HidiK66Ezr4pp8vmCii"

export default suite({
	"moniker matches demo": test(async() => {
		expect(moniker(demoId)).is(demoMoniker)
	}),
	"id->moniker->id": test(async() => {
		expect(moniker.toHex(moniker(demoId))).is(demoId)
	}),
})

