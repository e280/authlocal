
import {ed25519} from "@noble/curves/ed25519.js"
import {keyBytes} from "./kit.js"

export async function sign(
		secret: string,
		message: Uint8Array,
	): Promise<Uint8Array> {
	return ed25519.sign(message, keyBytes(secret))
}

export async function verify(
		id: string,
		message: Uint8Array,
		signature: Uint8Array,
	): Promise<boolean> {
	return ed25519.verify(signature, message, keyBytes(id))
}

