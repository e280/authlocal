
import {Thumbprint} from "@e280/stz"
import {dehydrate, hydrate} from "./seed.js"
import {deriveId, generateKeypair} from "./crypto.js"
import {validLabel} from "../common/utils/validation.js"

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

export async function generateIdentity(): Promise<Identity> {
	const {id, secret} = await generateKeypair()
	const label = Thumbprint.sigil.fromHex(id, {sigilByteCount: 4})
	return {label, id, secret}
}

export function toNametag({id, label}: Identity): Nametag {
	return {id, label}
}

/** convert identities to a seed text */
export async function dehydrateIdentities(...identities: Identity[]) {
	const texts = await Promise.all(identities.map(
		async identity =>
			JSON.stringify(identity.label)
				+ (await dehydrate(identity.secret))
					.split(" ")
					.map(s => `\n ${s}`)
					.join("")
	))
	return texts.join("\n\n")
}

/** read identities from seed text. returns an array of promises, one for each seed in the text. */
export function hydrateIdentities(seedtext: string) {
	seedtext = seedtext.trim()
	const regex = /("[^"]*")([^"]+)/gm
	const matches = [...seedtext.matchAll(regex)]
	return matches.map(
		async([, labelstring, bytename]) => {
			const label = labelstring ? JSON.parse(labelstring) : ""
			const secret = await hydrate(bytename)
			const id = await deriveId(secret)
			return <Identity>{
				id,
				secret,
				label: (label && validLabel(label))
					? label
					: Thumbprint.sigil.fromHex(id),
			}
		}
	)
}

export function dedupeIdentities(identities: Identity[]) {
	const map = new Map(identities.map(ident => [ident.id, ident]))
	return [...map.values()]
}

