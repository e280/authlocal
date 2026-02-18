
import {hex} from "@e280/stz"
import {deriveId} from "./derive.js"
import {Keypair, Secret} from "./types.js"

/** generate a secret hex key, 32 bytes, 64 characters */
export function generateSecret(): Secret {
	return hex.random(32)
}

/** generate a cryptographic ed25519 keypair */
export function generateKeypair(): Keypair {
	const secret = hex.random(32)
	const id = deriveId(secret)
	return {id, secret}
}

