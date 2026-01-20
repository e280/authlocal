
import {bytes, hex} from "@e280/stz"
import {sha256} from "@noble/hashes/sha2.js"

import {Root} from "../cryp/types.js"
import {motesFromBytes, motesToBytes} from "./parts/motes.js"

export function acorn(root: Root) {
	const rootBytes = hex.toBytes(root)
	const checksumBytes = sha256(rootBytes).slice(0, 2)

	const motes = [
		...motesFromBytes(rootBytes),
		...motesFromBytes(checksumBytes),
	]

	const lines = [
		motes.slice(0, 4),
		motes.slice(4, 8),
		motes.slice(8, 12),
		motes.slice(12, 16),
		motes.slice(16, 17),
	]

	return lines
		.map(line => line.join(" "))
		.join("\n")
}

acorn.toRoot = (text: string): Root => {
	const motes = text
		.trim()
		.split(/\s+/)
		.map(m => m.trim().toLowerCase())
		.filter(Boolean)

	if (motes.length !== 17)
		throw new Error("invalid number of motes")

	const reportedChecksumBytes = new Uint8Array(motesToBytes([motes.pop()!]))
	const rootBytes = new Uint8Array(motesToBytes(motes))
	const checksumBytes = sha256(rootBytes).slice(0, 2)

	if (!bytes.eq(reportedChecksumBytes, checksumBytes))
		throw new Error("invalid checksum")

	return hex.fromBytes(rootBytes)
}

