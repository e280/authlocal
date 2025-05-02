
import {Bytename, Hex} from "@e280/stz"
import {dehydrate, hydrate} from "./seed.js"
import {deriveId, generateKeypair} from "./crypto.js"

/** a user's identity */
export type Passport = {

	/** public key (64 hex chars) */
	id: string

	/** private key (64 hex chars) */
	secret: string

	/** human-readable name */
	label: string
}

/** public representation of a user's identity */
export type PassportPlacard = {
	id: string
	label: string
}

/** dehydrated passport data */
export type PassportSeed = {
	label: string
	secret: string
}

export function labelize(id: string) {
	const idBytes = Hex.bytes(id)
	return Bytename.string(idBytes.slice(0, 4))
}

export async function generatePassport(): Promise<Passport> {
	const {id, secret} = await generateKeypair()
	const label = labelize(id)
	return {label, id, secret}
}

export function toPlacard({id, label}: Passport): PassportPlacard {
	return {id, label}
}

export async function dehydratePassports(passports: Passport[]) {
	const texts = await Promise.all(passports.map(dehydratePassport))
	return texts.join("\n\n")
}

export async function hydratePassports(seeds: string) {
	seeds = seeds.trim()
	const regex = /("[^"]*")([^"]+)/gm
	const matches = [...seeds.matchAll(regex)]
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

