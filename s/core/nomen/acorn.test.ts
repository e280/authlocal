
import {acorn} from "./acorn.js"
import {suite, test, expect} from "@e280/science"

const demoRoot = "f3438c9ed773c49e82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoAcorn = `
namnut nibfer datset mitfer
mapfyl pidtem somsyt silrup
midsyr tacsul fopryn fadryl
milzod savdes macden sivwel
nilfus
`.trim()

export default suite({
	"root->acorn->root": test(async() => {
		expect(acorn.toRoot(acorn(demoRoot))).is(demoRoot)
	}),

	"acorn matches demo": test(async() => {
		expect(acorn(demoRoot)).is(demoAcorn)
	}),

	"tolerate whitespace": test(async() => {
		expect(acorn.toRoot(`
			namnut nibfer datset mitfer
			mapfyl pidtem somsyt silrup
			midsyr tacsul fopryn fadryl
			milzod savdes macden sivwel
			nilfus
		`)).is(demoRoot)
	}),

	"tolerate lettercase": test(async() => {
		expect(acorn.toRoot(`
			namnut nibfer datset mitfer
			MAPFYL PIDTEM SOMSYT SILRUP
			midsyr tacsul fopryn fadryl
			milzod savdes macden sivwel
			nilfus
		`)).is(demoRoot)
	}),

	"throw when checksum missing": test(async() => {
		expect(() => acorn.toRoot(`
			namnut nibfer datset mitfer
			mapfyl pidtem somsyt silrup
			midsyr tacsul fopryn fadryl
			milzod savdes macden sivwel
		`)).throws()
	}),

	"throw on empty": test(async() => {
		expect(() => acorn.toRoot("")).throws()
	}),
})

