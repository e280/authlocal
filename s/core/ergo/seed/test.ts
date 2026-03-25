
import {seed} from "./seed.js"
import {suite, test, expect} from "@e280/science"

const demoSecret = "0000deadbeefb00b82a92b28590a1ec93e64a026d593ceded40055d7bf4270cf"
const demoSeed = `
nidtak hatzyn
nopnop dedyak befbef bobbob
pidvak mormox zanzok kalpyk
sinhet curmyn varhek selmyd
turnop yenbyr molvyr hidwyd
`.trim()

export default suite({
	"secret->seed->secret": test(async() => {
		expect(seed.toSecret(seed(demoSecret))).is(demoSecret)
	}),

	"seed matches demo": test(async() => {
		expect(seed(demoSecret)).is(demoSeed)
	}),

	"tolerate whitespace": test(async() => {
		expect(seed.toSecret(`
			nidtak hatzyn
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).is(demoSecret)
	}),

	"tolerate lettercase": test(async() => {
		expect(seed.toSecret(`
			NIDTAK hatzyn
			nopnop dedyak befbef bobbob
			PIDVAK MORMOX ZANZOK KALPYK
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).is(demoSecret)
	}),

	"throw on empty": test(async() => {
		expect(() => seed.toSecret("")).throws()
	}),

	"throw when leading sigil is missing": test(async() => {
		expect(() => seed.toSecret(`
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).throws()
	}),

	"throw on corrupted sigil": test(async() => {
		expect(() => seed.toSecret(`
			nidtak hatnop
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).throws()
	}),

	"throw on corrupted secret": test(async() => {
		expect(() => seed.toSecret(`
			nidtak hatzyn
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidnop
		`)).throws()
	}),
})

