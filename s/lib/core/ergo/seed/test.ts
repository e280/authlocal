
import {suite, test, expect} from "@e280/science"
import {demo} from "../demo.js"
import {secretize} from "./secretize.js"
import {seedphrase} from "./seedphrase.js"
import {phraseToSeed} from "./phrase-to-seed.js"

export default suite({
	"secret->seed->secret": test(async() => {
		expect(phraseToSeed(seedphrase(demo.secret))).is(demo.secret)
	}),

	"secret->seed->secret 128": test(async() => {
		const seed = "5566ff64bc2bc5064764471d444dbfde"
		expect(phraseToSeed(seedphrase(seed))).is(seed)
	}),

	"secretize": test(async() => {
		const secret = "8f32eb8cb2631216d97baf43005c293d3a84adab78e40a48873b7c501ee2ec14"
		expect(secretize("5566ff64bc2bc5064764471d444dbfde").length).is(64)
		expect(secretize(secret)).is(secret)
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

