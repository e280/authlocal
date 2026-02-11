
import {suite, test, expect} from "@e280/science"
import {hash} from "./hashing.js"

export default suite({
	hashing: suite({
		"hash 'hello'": test(async() => {
			const text = "hello"
			expect(hash(text).length).is(64)
		}),
	}),
})

