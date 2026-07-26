
import {suite, test, expect} from "@e280/science"
import {demo} from "../demo.js"
import {seed} from "../../index.js"

export default suite({
	"secret->seed->secret": test(async() => {
		expect(seed.secret(seed.from(demo.root))).is(demo.root)
	}),

	"seed matches demo": test(async() => {
		expect(seed.from(demo.root)).is(demo.seed)
	}),

	"tolerate whitespace": test(async() => {
		expect(seed.secret(`\n\t ${demo.seed} \t\n`)).is(demo.root)
	}),

	"tolerate lettercase": test(async() => {
		expect(seed.secret(demo.seed.toUpperCase())).is(demo.root)
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

