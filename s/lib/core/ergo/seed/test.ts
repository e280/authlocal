
import {suite, test, expect} from "@e280/science"
import {demo} from "../demo.js"
import {seedphrase} from "./seedphrase.js"
import {seedphraseToSecret} from "./seedphrase-to-secret.js"

export default suite({
	"secret->seed->secret": test(async() => {
		expect(seedphraseToSecret(seedphrase(demo.secret))).is(demo.secret)
	}),

	"seed matches demo": test(async() => {
		expect(seedphrase(demo.secret)).is(demo.seed)
	}),

	"tolerate whitespace": test(async() => {
		expect(seedphraseToSecret(`\n\t ${demo.seed} \t\n`)).is(demo.secret)
	}),

	"tolerate lettercase": test(async() => {
		expect(seedphraseToSecret(demo.seed.toUpperCase())).is(demo.secret)
	}),

	"throw on empty": test(async() => {
		expect(() => seedphraseToSecret("")).throws()
	}),

	"throw when leading addr is missing": test(async() => {
		expect(() => seedphraseToSecret(`
			janvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),

	"throw on corrupted addr": test(async() => {
		expect(() => seedphraseToSecret(`
			NOPkon bodwyx
			janvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),

	"throw on corrupted secret": test(async() => {
		expect(() => seedphraseToSecret(`
			gurkon bodwyx
			NOPvuz yidgyx normok delsek
			yarbek kemlyx wordak nurgex
			calryz gelhet kabdak wobyok
			garfyr varnyd folyur lenray
		`)).throws()
	}),
})

