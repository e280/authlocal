
import {hex} from "@e280/stz"
import {Keypair} from "./types.js"
import {deriveId} from "./derive-id.js"

/** generate a cryptographic ed25519 keypair */
export function generateKeypair(): Keypair {
	const secret = hex.random(32)
	const id = deriveId(secret)
	return {id, secret}
}

