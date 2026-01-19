
import {moniker} from "./moniker.js"
import {suite, test, expect} from "@e280/science"

const demo = "f3438c9ed773c49e82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"

export default suite({
	"hex->moniker->hex": test(async() => {
		expect(moniker(demo)).is("_ribmug_hilmun")
	}),
})

