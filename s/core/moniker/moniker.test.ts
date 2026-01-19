
import {moniker} from "./moniker.js"
import {suite, test, expect} from "@e280/science"

const demoHex = "f3438c9ed773c49e82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoMoniker = "_namnut_nibfer_3DXZjNmfcKLWD4mdHK58HidiK66Ezr4pp8vmCii"

export default suite({
	"hex->moniker->hex": test(async() => {
		expect(moniker(demoHex)).is(demoMoniker)
		expect(moniker.toHex(moniker(demoHex))).is(demoHex)
	}),
})

