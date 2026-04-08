
import {demo} from "../demo.js"
import {seed} from "./index.js"
import {suite, test, expect} from "@e280/science"

export default suite({
	"secret->seed->secret": test(async() => {
		expect(seed.secret(seed.from(demo.secret))).is(demo.secret)
	}),

	"seed matches demo": test(async() => {
		expect(seed.from(demo.secret)).is(demo.seed)
	}),

	"tolerate whitespace": test(async() => {
		expect(seed.secret(`\n\t ${demo.seed} \t\n`)).is(demo.secret)
	}),

	"tolerate lettercase": test(async() => {
		expect(seed.secret(demo.seed.toUpperCase())).is(demo.secret)
	}),

	"throw on empty": test(async() => {
		expect(() => seed.secret("")).throws()
	}),

	"throw when leading addr is missing": test(async() => {
		expect(() => seed.secret(`
			janvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),

	"throw on corrupted addr": test(async() => {
		expect(() => seed.secret(`
			NOPkon bodwyx
			janvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),

	"throw on corrupted secret": test(async() => {
		expect(() => seed.secret(`
			gurkon bodwyx
			NOPvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),
})

