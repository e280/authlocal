
import {unpack} from "./crypto.js"
import {Bytename, Hex} from "@e280/stz"

export class SeedError extends Error { name = this.constructor.name }
export class SeedIncompleteError extends SeedError {}
export class SeedChecksumError extends SeedError {}

/** convert a 64-char hex string to a human-friendly barname seed (with a 2-byte checksum) */
export async function dehydrate(secret: string) {
	const secretBytes = unpack(secret)
	const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", secretBytes))
	const checksumBytes = hash.slice(0, 2)
	const seedBytes = new Uint8Array([...secretBytes, ...checksumBytes])
	return Bytename.string(seedBytes)
}

/** convert a human-friendly barname seed to a 64-char hex string (with checksum validation) */
export async function hydrate(seed: string) {
	const bytes = Bytename.bytes(seed)

	if (bytes.length !== 34)
		throw new SeedIncompleteError("seed must be 34 bytes")

	const secretBytes = bytes.slice(0, 32)
	const checksumBytes = bytes.slice(32, 34)
	const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", secretBytes))
	const invalidChecksum = Hex.string(hash.slice(0, 2)) !== Hex.string(checksumBytes)

	if (invalidChecksum)
		throw new SeedChecksumError("invalid seed checksum")

	return Hex.string(secretBytes)
}

