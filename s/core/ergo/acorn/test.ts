
import {acorn} from "./acorn.js"
import {suite, test, expect} from "@e280/science"

const demoSecret = "0000deadbeefb00b82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoAcorn = `
nidtak hatzyn
nopnop dedyak befbef bobbob
pidvak mormox zanzok kalpyk
sinhet curmyn varhek selmyd
turnop yenbyr molvyr hidwyd
`.trim()

export default suite({
	"secret->acorn->secret": test(async() => {
		expect(acorn.toSecret(acorn(demoSecret))).is(demoSecret)
	}),

	"acorn matches demo": test(async() => {
		expect(acorn(demoSecret)).is(demoAcorn)
	}),

	"tolerate whitespace": test(async() => {
		expect(acorn.toSecret(`
			nidtak hatzyn
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).is(demoSecret)
	}),

	"tolerate lettercase": test(async() => {
		expect(acorn.toSecret(`
			NIDTAK hatzyn
			nopnop dedyak befbef bobbob
			PIDVAK MORMOX ZANZOK KALPYK
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).is(demoSecret)
	}),

	"throw on empty": test(async() => {
		expect(() => acorn.toSecret("")).throws()
	}),

	"throw when leading sigil is missing": test(async() => {
		expect(() => acorn.toSecret(`
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).throws()
	}),

	"throw on corrupted sigil": test(async() => {
		expect(() => acorn.toSecret(`
			nidtak hatnop
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).throws()
	}),

	"throw on corrupted secret": test(async() => {
		expect(() => acorn.toSecret(`
			nidtak hatzyn
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidnop
		`)).throws()
	}),
})

