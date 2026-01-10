
import {Science, test, expect} from "@e280/science"

await Science.run({
	"test": test(async() => {
		expect(1 + 2).is(3)
	}),
})

