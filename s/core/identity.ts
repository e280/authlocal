
import {Bytename, Hex} from "@e280/stz"
import {dehydrate, hydrate} from "./seed.js"
import {deriveId, generateKeypair} from "./crypto.js"

/** a user's identity */
export type Identity = {

	/** public key (64 hex chars) */
	id: string

	/** private key (64 hex chars) */
	secret: string

	/** nickname associated with this identity */
	label: string
}

/** public representation of a user's identity */
export type Nametag = {
	id: string
	label: string
}

export function labelize(id: string) {
	const idBytes = Hex.bytes(id)
	return Bytename.string(idBytes.slice(0, 4))
}

export async function generateIdentity(): Promise<Identity> {
	const {id, secret} = await generateKeypair()
	const label = labelize(id)
	return {label, id, secret}
}

export function toNametag({id, label}: Identity): Nametag {
	return {id, label}
}

export async function dehydrateIdentities(...identities: Identity[]) {
	const texts = await Promise.all(identities.map(dehydrateIdentity))
	return texts.join("\n\n")
}

export async function hydrateIdentities(seeds: string) {
	seeds = seeds.trim()
	const regex = /("[^"]*")([^"]+)/gm
	const matches = [...seeds.matchAll(regex)]
	return await Promise.all(matches.map(
		([, label, bytename]) => hydrateIdentity(
			label ? JSON.parse(label) : "",
			bytename,
		)
	))
}

async function dehydrateIdentity(identity: Identity) {
	return JSON.stringify(identity.label)
		+ (await dehydrate(identity.secret))
			.split(" ")
			.map(s => `\n  ${s}`)
			.join("")
}

async function hydrateIdentity(label: string, barname: string): Promise<Identity> {
	const secret = await hydrate(barname)
	const id = await deriveId(secret)
	return {
		id,
		secret,
		label: label || (labelize(id)),
	}
}

