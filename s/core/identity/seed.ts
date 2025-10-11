
import {bytename, hex, thumbprint} from "@e280/stz"
import {Identity} from "./types.js"
import {deriveId, keyBytes} from "../crypto/crypto.js"
import {validLabel} from "../../app/tools/validation.js"

/** serialize identities as seed text */
export async function seedPack(...identities: Identity[]) {
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

/** deserialize identities from seed text. returns an array of promises, one for each seed in the text. */
export function seedRecover(seedtext: string) {
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
					: thumbprint.sigil.fromHex(id),
			}
		}
	)
}

export class SeedError extends Error { name = this.constructor.name }
export class SeedIncompleteError extends SeedError {}
export class SeedChecksumError extends SeedError {}

/** convert hex key to seedling (with a 2-byte checksum) */
async function dehydrate(secret: string) {
	const secretBytes = keyBytes(secret)
	const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(secretBytes)))
	const checksumBytes = hash.slice(0, 2)
	const seedBytes = new Uint8Array([...secretBytes, ...checksumBytes])
	if (seedBytes.length !== 34)
		throw new SeedIncompleteError("seed must be 34 bytes")
	return bytename.fromBytes(seedBytes)
}

/** convert seed to hex key (with checksum validation) */
async function hydrate(seedling: string) {
	const raw = bytename.toBytes(seedling)

	if (raw.length !== 34)
		throw new SeedIncompleteError("seed must be 34 bytes")

	const secretBytes = raw.slice(0, 32)
	const checksumBytes = raw.slice(32, 34)
	const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", secretBytes))
	const invalidChecksum = hex.fromBytes(hash.slice(0, 2)) !== hex.fromBytes(checksumBytes)

	if (invalidChecksum)
		throw new SeedChecksumError("invalid seed checksum")

	return hex.fromBytes(secretBytes)
}

