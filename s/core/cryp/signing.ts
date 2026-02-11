
import {hex} from "@e280/stz"
import {ed25519} from "@noble/curves/ed25519.js"

import {keyBytes} from "./kit.js"
import {deriveId} from "./derive.js"
import {Id, Keypair, Secret} from "./types.js"

export function generateKeypair(): Keypair {
	const secret = hex.random(32)
	const id = deriveId(secret)
	return {id, secret}
}

export function signBytes(
		secret: Secret,
		message: Uint8Array,
	): Uint8Array {
	return ed25519.sign(message, keyBytes(secret))
}

export function verifyBytes(
		id: Id,
		message: Uint8Array,
		signature: Uint8Array,
	): boolean {
	return ed25519.verify(signature, message, keyBytes(id))
}

