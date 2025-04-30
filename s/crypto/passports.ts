
import {Passport} from "./concepts.js"
import {deriveId} from "./core.js"
import {labelize} from "./routines.js"
import {dehydrate, hydrate} from "./seeds.js"

export async function dehydratePassports(passports: Passport[]) {
	const texts = await Promise.all(passports.map(dehydratePassport))
	return texts.join("\n\n") + "\n\n"
}

export async function hydratePassports(text: string) {
	text = text.trim()
	const regex = /("[^"]*")([^"]+)/gm
	const matches = [...text.matchAll(regex)]
	return await Promise.all(matches.map(
		([, label, barname]) => hydratePassport(
			label ? JSON.parse(label) : "",
			barname,
		)
	))
}

async function dehydratePassport(passport: Passport) {
	return JSON.stringify(passport.label)
		+ (await dehydrate(passport.secret))
			.split(" ")
			.map(s => `\n  ${s}`)
			.join("")
}

async function hydratePassport(label: string, barname: string): Promise<Passport> {
	const secret = await hydrate(barname)
	const id = await deriveId(secret)
	return {
		id,
		secret,
		label: label || (labelize(id)),
	}
}

