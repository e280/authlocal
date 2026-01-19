
import {Science, test, expect} from "@e280/science"
import monikerTest from "./core/moniker/moniker.test.js"

await Science.run({
	monikerTest,
	"test": test(async() => {
		expect(1 + 2).is(3)
	}),
})

