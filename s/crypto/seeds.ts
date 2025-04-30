
import {unpack} from "./core.js"
import {Barname, Hex} from "@e280/stz"

/**
 * - seeds are human-friendly phrases that are easier to copy than hex
 * - in authlocal, the term 'secret' refers to any private key (64 hex chars)
 * - this utility helps you convert between seeds and secrets
 */
export const Seeds = {
	async fromSecret(secret: string) {
		const secretBytes = unpack(secret)
		const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", secretBytes))
		const checksumBytes = hash.slice(0, 2)
		const seedBytes = new Uint8Array([...secretBytes, ...checksumBytes])
		return Barname.string(seedBytes)
	},

	async toSecret(seed: string) {
		const bytes = Barname.bytes(seed)

		if (bytes.length !== 34)
			throw new Error("seed must be 34 bytes")

		const secretBytes = bytes.slice(0, 32)
		const checksumBytes = bytes.slice(32, 34)
		const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", secretBytes))
		const invalidChecksum = Hex.string(hash.slice(0, 2)) !== Hex.string(checksumBytes)

		if (invalidChecksum)
			throw new Error("invalid seed checksum")

		return Hex.string(secretBytes)
	},
}

