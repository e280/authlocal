
import {Science, test, expect} from "@e280/science"
import moniker from "./core/moniker/moniker.test.js"
import acorn from "./core/moniker/acorn.test.js"

await Science.run({
	acorn,
	moniker,
	"test": test(async() => {
		expect(1 + 2).is(3)
	}),
})

