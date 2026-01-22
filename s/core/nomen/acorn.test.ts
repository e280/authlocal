
import {acorn} from "./acorn.js"
import {suite, test, expect} from "@e280/science"

const demoHex = "00008c9ed773c49e82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
// const demoHex = "0000deadbeefc49e82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
// console.log(acorn(demoHex))
const demoAcorn = `
nopnop tobmok volpur nurmok
pidvak mormox zanzok kalpyk
sinhet curmyn varhek selmyd
turnop yenbyr molvyr hidwyd
fabsur
`.trim()

export default suite({
	"root->acorn->root": test(async() => {
		expect(acorn.toRoot(acorn(demoHex))).is(demoHex)
	}),

	"acorn matches demo": test(async() => {
		expect(acorn(demoHex)).is(demoAcorn)
	}),

	"tolerate whitespace": test(async() => {
		expect(acorn.toRoot(`
			nopnop tobmok volpur nurmok
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
			fabsur
		`)).is(demoHex)
	}),

	"tolerate lettercase": test(async() => {
		expect(acorn.toRoot(`
			nopnop tobmok volpur nurmok
			PIDVAK MORMOX ZANZOK KALPYK
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
			fabsur
		`)).is(demoHex)
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

