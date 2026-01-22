
import {acorn} from "./acorn.js"
import {suite, test, expect} from "@e280/science"

const demoHex = "0000deadbeefb00b82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoAcorn = `
nopnop dedyak befbef bobbob
pidvak mormox zanzok kalpyk
sinhet curmyn varhek selmyd
turnop yenbyr molvyr hidwyd
borgek
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
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
			borgek
		`)).is(demoHex)
	}),

	"tolerate lettercase": test(async() => {
		expect(acorn.toRoot(`
			nopnop dedyak befbef bobbob
			PIDVAK MORMOX ZANZOK KALPYK
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
			borgek
		`)).is(demoHex)
	}),

	"throw when checksum missing": test(async() => {
		expect(() => acorn.toRoot(`
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).throws()
	}),

	"throw on empty": test(async() => {
		expect(() => acorn.toRoot("")).throws()
	}),
})

