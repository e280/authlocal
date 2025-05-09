
import {deep} from "@e280/stz"
import {Science, test, expect} from "@e280/science"

import {SeedChecksumError} from "./seed.js"
import {dehydrateIdentities, hydrateIdentities, Identity} from "./identity.js"

function scrutinizeIdentity(identity: Identity) {
	expect(typeof identity.label).is("string")
	expect(identity.label).ok()
	expect(identity.id.length).is(64)
	expect(identity.secret.length).is(64)
}

async function readSeeds(seed: string) {
	const promises = hydrateIdentities(seed)
	return Promise.all(promises)
}

const sampleIdentities: Identity[] = [
	{"label":"ligrex.nolwyd","id":"6f58d836a227dd44459f4f4ce98fd75758cf858eb88eebe63cc5e0522f88a267","secret":"dc738b54ddd700d4295147104a20e0a2ab29999135fbdf6cdb2a2c3d89452c84"},
	{"label":"dalryd.motryn","id":"25cc5293e75ca31a5eb8052e021fb9799579cd46de6e5909980fe44bc2b3aa07","secret":"539534b1c307985d4fa0586541916873b2fa169f2081173afa21bdf3e5ee539d"},
	{"label":"larrev.wacdus","id":"e18b0c81de6199111814356eceb051eea1916dce1a0ca494a52f0446e88afd84","secret":"b85e894541f6464276434aede306b0dc822d68a601a14da37fff6222c9dc369d"},
]

export default Science.suite({
	"dehydrate": test(async() => {
		const [identity] = sampleIdentities
		const text = await dehydrateIdentities(identity)
		expect(text.length).gt(100)
	}),

	"dehydrate+hydrate": test(async() => {
		const text = await dehydrateIdentities(...sampleIdentities)
		const identities = await readSeeds(text)
		expect(identities.length).is(sampleIdentities.length)

		for (const identity of identities)
			scrutinizeIdentity(identity)

		sampleIdentities.forEach((sample, index) => {
			const identity = identities.at(index)!
			expect(deep.equal(sample, identity)).ok()
		})
	}),

	"hydrate": Science.suite({
		"simple": test(async() => {
			const identities = await readSeeds(`"fadpec.tabnel" pachul.migryd.ripren.ritret misreg.tarnep.rabnul.panhep lonfyr.larler.sigwep.filmeg dotreg.filtyp.nosnus.siptev divder`)
			expect(identities.length).is(1)
			scrutinizeIdentity(identities[0])
		}),

		"multiline": test(async() => {
			const identities = await readSeeds(`
				"minref.lagner"
					midsen.picmyn.widrep.baclut
					somreg.sivler.havrun.tapfeb
					ticpem.hanlev.topbec.lorreb
					sipsyp.sarred.dassyn.barlug
					pitber
			`)
			expect(identities.length).is(1)
			scrutinizeIdentity(identities[0])
		}),

		"polluted": test(async() => {
			const identities = await readSeeds(`
				"🤖 Robocop 5000.,,'"
					$midsen_picmyn widrep.baclut
					somreg@sivler#havrun&tapfeb
					TICPEMHANLEV TOPBEC::LOR--REB
					sipsyp//sarreddassynbarlug
					pitber
			`)
			expect(identities.length).is(1)
			scrutinizeIdentity(identities[0])
		}),

		"multiples": test(async() => {
			const identities = await readSeeds(`
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
			expect(identities.length).is(2)
			scrutinizeIdentity(identities[0])
			scrutinizeIdentity(identities[1])
		}),

		"multiples, jumbled": test(async() => {
			const identities = await readSeeds(`
				"minref.lagner" midsen.picmyn.widrep.baclut somreg.sivler.havrun.tapfeb
					ticpem.hanlev.topbec.lorreb sipsyp.sarred.dassyn.barlug
					pitber "Johnny Johnson"
				rovmes.fiddyl.dottev.halryc mosfeb.dopryl.faldex.molwyl
				havtuc.satbyt.lartyc.fotfeb
				navhes.sivdyt.bornyt.togpex
				sanmus
			`)
			expect(identities.length).is(2)
			scrutinizeIdentity(identities[0])
			scrutinizeIdentity(identities[1])
		}),

		"no label": test(async() => {
			const identities = await readSeeds(`
				""
					rovmes.fiddyl.dottev.halryc
					mosfeb.dopryl.faldex.molwyl
					havtuc.satbyt.lartyc.fotfeb
					navhes.sivdyt.bornyt.togpex
					sanmus
			`)
			scrutinizeIdentity(identities[0])
			expect(identities[0].label.length).gt(0)
		}),

		"invalid": Science.suite({
			"empty": test(async() => {
				const identities = await readSeeds(``)
				expect(identities.length).is(0)
			}),

			"missing endquote": test(async() => {
				const identities = await readSeeds(`
					"minref.lagner
						midsen.picmyn.widrep.baclut
						somreg.sivler.havrun.tapfeb
						ticpem.hanlev.topbec.lorreb
						sipsyp.sarred.dassyn.barlug
						pitber
				`)
				expect(identities.length).is(0)
			}),

			"missing startquote": test(async() => {
				const identities = await readSeeds(`
					minref.lagner"
						midsen.picmyn.widrep.baclut
						somreg.sivler.havrun.tapfeb
						ticpem.hanlev.topbec.lorreb
						sipsyp.sarred.dassyn.barlug
						pitber
				`)
				expect(identities.length).is(0)
			}),

			"missing quotes": test(async() => {
				const identities = await readSeeds(`
					minref.lagner
						midsen.picmyn.widrep.baclut
						somreg.sivler.havrun.tapfeb
						ticpem.hanlev.topbec.lorreb
						sipsyp.sarred.dassyn.barlug
						pitber
				`)
				expect(identities.length).is(0)
			}),

			"missing label": test(async() => {
				const identities = await readSeeds(`
					midsen.picmyn.widrep.baclut
					somreg.sivler.havrun.tapfeb
					ticpem.hanlev.topbec.lorreb
					sipsyp.sarred.dassyn.barlug
					pitber
				`)
				expect(identities.length).is(0)
			}),

			"failed checksum": test(async() => {
				expect(async() => await readSeeds(`
					"minref.lagner"
						midsen.picmyn.widrep.baclut
						somreg.sivler.havrun.tapfeb
						ticpem.hanlev.topbec.lorreb
						sipsyp.sarred.dassyn.barlug
						midsen
				`)).throwsAsync(SeedChecksumError)
			}),
		}),
	}),
})

