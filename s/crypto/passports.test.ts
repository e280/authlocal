
import {deep} from "@e280/stz"
import {Science, test, expect} from "@e280/science"

import {Passport} from "./concepts.js"
import {dehydratePassports, hydratePassports} from "./passports.js"

function scrutinizePassport(passport: Passport) {
	expect(typeof passport.label).is("string")
	expect(passport.label).ok()
	expect(passport.id.length).is(64)
	expect(passport.secret.length).is(64)
}

const samplePassports: Passport[] = [
	{"label":"ligrex.nolwyd","id":"6f58d836a227dd44459f4f4ce98fd75758cf858eb88eebe63cc5e0522f88a267","secret":"dc738b54ddd700d4295147104a20e0a2ab29999135fbdf6cdb2a2c3d89452c84"},
	{"label":"dalryd.motryn","id":"25cc5293e75ca31a5eb8052e021fb9799579cd46de6e5909980fe44bc2b3aa07","secret":"539534b1c307985d4fa0586541916873b2fa169f2081173afa21bdf3e5ee539d"},
	{"label":"larrev.wacdus","id":"e18b0c81de6199111814356eceb051eea1916dce1a0ca494a52f0446e88afd84","secret":"b85e894541f6464276434aede306b0dc822d68a601a14da37fff6222c9dc369d"},
]

export const passportsSuite = Science.suite({
	"dehydrate": test(async() => {
		const [passport] = samplePassports
		const text = await dehydratePassports([passport])
		expect(text.length).gt(100)
	}),

	"dehydrate+hydrate": test(async() => {
		const text = await dehydratePassports(samplePassports)
		const passports = await hydratePassports(text)
		expect(passports.length).is(samplePassports.length)

		for (const passport of passports)
			scrutinizePassport(passport)

		samplePassports.forEach((sample, index) => {
			const passport = passports.at(index)!
			expect(deep.equal(sample, passport)).ok()
		})
	}),

	"hydrate": Science.suite({
		"simple": test(async() => {
			const passports = await hydratePassports(`"fadpec.tabnel" pachul.migryd.ripren.ritret misreg.tarnep.rabnul.panhep lonfyr.larler.sigwep.filmeg dotreg.filtyp.nosnus.siptev divder`)
			expect(passports.length).is(1)
			scrutinizePassport(passports[0])
		}),

		"multiline": test(async() => {
			const passports = await hydratePassports(`
				"minref.lagner"
					midsen.picmyn.widrep.baclut
					somreg.sivler.havrun.tapfeb
					ticpem.hanlev.topbec.lorreb
					sipsyp.sarred.dassyn.barlug
					pitber
			`)
			expect(passports.length).is(1)
			scrutinizePassport(passports[0])
		}),

		"polluted": test(async() => {
			const passports = await hydratePassports(`
				"🤖 Robocop 5000.,,'"
					$midsen_picmyn widrep.baclut
					somreg@sivler#havrun&tapfeb
					TICPEMHANLEV TOPBEC::LOR--REB
					sipsyp//sarreddassynbarlug
					pitber
			`)
			expect(passports.length).is(1)
			scrutinizePassport(passports[0])
		}),

		"multiples": test(async() => {
			const passports = await hydratePassports(`
				"minref.lagner"
					midsen.picmyn.widrep.baclut
					somreg.sivler.havrun.tapfeb
					ticpem.hanlev.topbec.lorreb
					sipsyp.sarred.dassyn.barlug
					pitber
				"Johnny Johnson"
					rovmes.fiddyl.dottev.halryc
					mosfeb.dopryl.faldex.molwyl
					havtuc.satbyt.lartyc.fotfeb
					navhes.sivdyt.bornyt.togpex
					sanmus
			`)
			expect(passports.length).is(2)
			scrutinizePassport(passports[0])
			scrutinizePassport(passports[1])
		}),

		"multiples, jumbled": test(async() => {
			const passports = await hydratePassports(`
				"minref.lagner" midsen.picmyn.widrep.baclut somreg.sivler.havrun.tapfeb
					ticpem.hanlev.topbec.lorreb sipsyp.sarred.dassyn.barlug
					pitber "Johnny Johnson"
				rovmes.fiddyl.dottev.halryc mosfeb.dopryl.faldex.molwyl
				havtuc.satbyt.lartyc.fotfeb
				navhes.sivdyt.bornyt.togpex
				sanmus
			`)
			expect(passports.length).is(2)
			scrutinizePassport(passports[0])
			scrutinizePassport(passports[1])
		}),

		"no label": test(async() => {
			const passports = await hydratePassports(`
				""
					rovmes.fiddyl.dottev.halryc
					mosfeb.dopryl.faldex.molwyl
					havtuc.satbyt.lartyc.fotfeb
					navhes.sivdyt.bornyt.togpex
					sanmus
			`)
			scrutinizePassport(passports[0])
			expect(passports[0].label.length).is(13) // default'd
		}),

		"invalid": Science.suite({
			"empty": test(async() => {
				const passports = await hydratePassports(``)
				expect(passports.length).is(0)
			}),

			"missing endquote": test(async() => {
				const passports = await hydratePassports(`
					"minref.lagner
						midsen.picmyn.widrep.baclut
						somreg.sivler.havrun.tapfeb
						ticpem.hanlev.topbec.lorreb
						sipsyp.sarred.dassyn.barlug
						pitber
				`)
				expect(passports.length).is(0)
			}),

			"missing startquote": test(async() => {
				const passports = await hydratePassports(`
					minref.lagner"
						midsen.picmyn.widrep.baclut
						somreg.sivler.havrun.tapfeb
						ticpem.hanlev.topbec.lorreb
						sipsyp.sarred.dassyn.barlug
						pitber
				`)
				expect(passports.length).is(0)
			}),

			"missing quotes": test(async() => {
				const passports = await hydratePassports(`
					minref.lagner
						midsen.picmyn.widrep.baclut
						somreg.sivler.havrun.tapfeb
						ticpem.hanlev.topbec.lorreb
						sipsyp.sarred.dassyn.barlug
						pitber
				`)
				expect(passports.length).is(0)
			}),

			"missing label": test(async() => {
				const passports = await hydratePassports(`
					midsen.picmyn.widrep.baclut
					somreg.sivler.havrun.tapfeb
					ticpem.hanlev.topbec.lorreb
					sipsyp.sarred.dassyn.barlug
					pitber
				`)
				expect(passports.length).is(0)
			}),

			"failed checksum": test(async() => {
				expect(async() => await hydratePassports(`
					"minref.lagner"
						midsen.picmyn.widrep.baclut
						somreg.sivler.havrun.tapfeb
						ticpem.hanlev.topbec.lorreb
						sipsyp.sarred.dassyn.barlug
						midsen
				`)).throwsAsync()
			}),
		}),
	}),
})

