
import {bytename, hex, thumbprint} from "@e280/stz"
import {Identity} from "./types.js"
import {Err} from "../utils/err.js"
import {Hex} from "../cryp/types.js"
import {validLabel} from "./validation.js"
import {deriveId, keyBytes} from "../cryp.barrel.js"

export class CodeIncompleteErr extends Err {}
export class CodeChecksumErr extends Err {}

/** serialize identities as code text */
export async function pack(...identities: Identity[]) {
	const codetexts = await Promise.all(identities.map(
		async identity =>
			JSON.stringify(identity.label)
				+ (await dehydrate(identity.seed))
					.split(" ")
					.map(s => `\n ${s}`)
					.join("")
	))
	return codetexts.join("\n\n")
}

/** deserialize identities from code text. returns an array of promises, one for each seed in the text. */
export function unpack(codetext: string) {
	codetext = codetext.trim()
	const regex = /("[^"]*")([^"]+)/gm
	const matches = [...codetext.matchAll(regex)]
	return matches.map(
		async([, labelstring, bytename]) => {
			const label = labelstring ? JSON.parse(labelstring) : ""
			const secret = await hydrate(bytename)
			const id = await deriveId(secret)
			return <Identity>{
				id,
				seed: secret,
				label: (label && validLabel(label))
					? label
					: thumbprint.sigil.fromHex(id),
			}
		}
	)
}

/** convert hex key to seedling (with a 2-byte checksum) */
async function dehydrate(secret: Hex) {
	const secretBytes = keyBytes(secret)
	const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", new Uint8Array(secretBytes)))
	const checksumBytes = hash.slice(0, 2)
	const seedBytes = new Uint8Array([...secretBytes, ...checksumBytes])
	if (seedBytes.length !== 34)
		throw new CodeIncompleteErr("seed must be 34 bytes")
	return bytename.fromBytes(seedBytes)
}

/** convert seedling to hex key (with checksum validation) */
async function hydrate(seedling: string) {
	const raw = bytename.toBytes(seedling)

	if (raw.length !== 34)
		throw new CodeIncompleteErr("seed must be 34 bytes")

	const secretBytes = raw.slice(0, 32)
	const checksumBytes = raw.slice(32, 34)
	const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", secretBytes))
	const invalidChecksum = hex.fromBytes(hash.slice(0, 2)) !== hex.fromBytes(checksumBytes)

	if (invalidChecksum)
		throw new CodeChecksumErr("invalid seed checksum")

	return hex.fromBytes(secretBytes)
}

