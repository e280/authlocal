
import {Hex} from "@e280/stz"
import * as ed from "@noble/ed25519"

import {Keypair} from "./types.js"

export function unpackKey(key: string) {
	const bytes = Hex.bytes(key)
	if (bytes.length !== 32)
		throw new Error("invalid key")
	return bytes
}

export async function deriveId(secret: string): Promise<string> {
	const secretBytes = unpackKey(secret)
	const idBytes = await ed.getPublicKeyAsync(secretBytes)
	return Hex.string(idBytes)
}

export async function generateKeypair(): Promise<Keypair> {
	const secret = Hex.random(32)
	const id = await deriveId(secret)
	return {id, secret}
}

export async function sign(
		message: Uint8Array,
		secret: string,
	): Promise<Uint8Array> {
	return ed.signAsync(message, unpackKey(secret))
}

export async function verify(
		message: Uint8Array,
		signature: Uint8Array,
		id: string,
	): Promise<boolean> {
	return ed.verifyAsync(signature, message, unpackKey(id))
}

