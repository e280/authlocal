
import {ed25519} from "@noble/curves/ed25519.js"
import {keyBytes} from "./kit.js"
import {Id, Secret} from "./types.js"

export function signBytes(secret: Secret, message: Uint8Array) {
	return ed25519.sign(message, keyBytes(secret))
}

export function verifyBytes(id: Id, message: Uint8Array, signature: Uint8Array) {
	return ed25519.verify(signature, message, keyBytes(id))
}

