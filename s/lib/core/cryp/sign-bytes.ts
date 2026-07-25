
import {ed25519} from "@noble/curves/ed25519.js"
import {keyBytes} from "./key-bytes.js"
import {Secret} from "./types.js"

export function signBytes(secret: Secret, message: Uint8Array) {
	return ed25519.sign(message, keyBytes(secret))
}

