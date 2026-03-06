
import {ed25519} from "@noble/curves/ed25519.js"
import {Id} from "./types.js"
import {keyBytes} from "./key-bytes.js"

export function verifyBytes(id: Id, message: Uint8Array, signature: Uint8Array) {
	return ed25519.verify(signature, message, keyBytes(id))
}

