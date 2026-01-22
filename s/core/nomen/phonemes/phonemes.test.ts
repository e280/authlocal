
import {suite, test, expect} from "@e280/science"
import {prefixes, suffixes} from "./phonemes.js"

export default suite({
	"256 prefix count": test(async() => {
		expect(prefixes.size).is(256)
	}),

	"256 suffix count": test(async() => {
		expect(suffixes.size).is(256)
	}),
})

