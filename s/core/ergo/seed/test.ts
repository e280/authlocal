
import {seed} from "./index.js"
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
		expect(seed.secret(seed.from(demoSecret))).is(demoSecret)
	}),

	"seed matches demo": test(async() => {
		expect(seed.from(demoSecret)).is(demoSeed)
	}),

	"tolerate whitespace": test(async() => {
		expect(seed.secret(`
			nidtak hatzyn
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).is(demoSecret)
	}),

	"tolerate lettercase": test(async() => {
		expect(seed.secret(`
			NIDTAK hatzyn
			nopnop dedyak befbef bobbob
			PIDVAK MORMOX ZANZOK KALPYK
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).is(demoSecret)
	}),

	"throw on empty": test(async() => {
		expect(() => seed.secret("")).throws()
	}),

	"throw when leading nom is missing": test(async() => {
		expect(() => seed.secret(`
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).throws()
	}),

	"throw on corrupted nom": test(async() => {
		expect(() => seed.secret(`
			nidtak hatnop
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidwyd
		`)).throws()
	}),

	"throw on corrupted secret": test(async() => {
		expect(() => seed.secret(`
			nidtak hatzyn
			nopnop dedyak befbef bobbob
			pidvak mormox zanzok kalpyk
			sinhet curmyn varhek selmyd
			turnop yenbyr molvyr hidnop
		`)).throws()
	}),
})

