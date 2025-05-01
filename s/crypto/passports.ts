
import {Bytename, Hex} from "@e280/stz"
import {Passport} from "./concepts.js"
import {dehydrate, hydrate} from "./seeds.js"
import {deriveId, generateKeypair} from "./core.js"

export function labelize(id: string) {
	const idBytes = Hex.bytes(id)
	return Bytename.string(idBytes.slice(0, 4))
}

export async function generatePassport(): Promise<Passport> {
	const {id, secret} = await generateKeypair()
	const label = labelize(id)
	return {label, id, secret}
}

export async function dehydratePassports(passports: Passport[]) {
	const texts = await Promise.all(passports.map(dehydratePassport))
	return texts.join("\n\n") + "\n\n"
}

export async function hydratePassports(text: string) {
	text = text.trim()
	const regex = /("[^"]*")([^"]+)/gm
	const matches = [...text.matchAll(regex)]
	return await Promise.all(matches.map(
		([, label, bytename]) => hydratePassport(
			label ? JSON.parse(label) : "",
			bytename,
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

