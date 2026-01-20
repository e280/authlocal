
import {hex} from "@e280/stz"
import {ed25519} from "@noble/curves/ed25519.js"

import {keyBytes} from "./kit.js"
import {deriveId} from "./derive.js"
import {Id, Keypair, Secret} from "./types.js"

export async function generateKeypair(): Promise<Keypair> {
	const secret = hex.random(32)
	const id = await deriveId(secret)
	return {id, secret}
}

export async function sign(
		secret: Secret,
		message: Uint8Array,
	): Promise<Uint8Array> {
	return ed25519.sign(message, keyBytes(secret))
}

export async function verify(
		id: Id,
		message: Uint8Array,
		signature: Uint8Array,
	): Promise<boolean> {
	return ed25519.verify(signature, message, keyBytes(id))
}

