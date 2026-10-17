
import {suite, test, expect} from "@e280/science"
import {demo} from "../demo.js"
import {seedphrase} from "./seedphrase.js"
import {phraseToSeed} from "./phrase-to-seed.js"

export default suite({
	"secret->seed->secret": test(async() => {
		expect(phraseToSeed(seedphrase(demo.secret))).is(demo.secret)
	}),

	"seed matches demo": test(async() => {
		expect(seedphrase(demo.secret)).is(demo.seed)
	}),

	"tolerate whitespace": test(async() => {
		expect(phraseToSeed(`\n\t ${demo.seed} \t\n`)).is(demo.secret)
	}),

	"tolerate lettercase": test(async() => {
		expect(phraseToSeed(demo.seed.toUpperCase())).is(demo.secret)
	}),

	"throw on empty": test(async() => {
		expect(() => phraseToSeed("")).throws()
	}),

	"throw when leading addr is missing": test(async() => {
		expect(() => phraseToSeed(`
			janvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),

	"throw on corrupted addr": test(async() => {
		expect(() => phraseToSeed(`
			NOPkon bodwyx
			janvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),

	"throw on corrupted secret": test(async() => {
		expect(() => phraseToSeed(`
			gurkon bodwyx
			NOPvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),
})

