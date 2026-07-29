
import {suite, test, expect} from "@e280/science"
import {seed} from "./seed.js"
import {demo} from "../demo.js"
import {seedSecret} from "./secret.js"

export default suite({
	"secret->seed->secret": test(async() => {
		expect(seedSecret(seed(demo.root))).is(demo.root)
	}),

	"seed matches demo": test(async() => {
		expect(seed(demo.root)).is(demo.seed)
	}),

	"tolerate whitespace": test(async() => {
		expect(seedSecret(`\n\t ${demo.seed} \t\n`)).is(demo.root)
	}),

	"tolerate lettercase": test(async() => {
		expect(seedSecret(demo.seed.toUpperCase())).is(demo.root)
	}),

	"throw on empty": test(async() => {
		expect(() => seedSecret("")).throws()
	}),

	"throw when leading addr is missing": test(async() => {
		expect(() => seedSecret(`
			janvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),

	"throw on corrupted addr": test(async() => {
		expect(() => seedSecret(`
			NOPkon bodwyx
			janvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),

	"throw on corrupted secret": test(async() => {
		expect(() => seedSecret(`
			gurkon bodwyx
			NOPvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),
})

