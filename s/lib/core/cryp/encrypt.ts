
import {bytes} from "@e280/stz"
import {xchacha20poly1305} from "@awasm/noble"
import {Secret} from "./types.js"
import {keyBytes} from "./key-bytes.js"
import {cryption} from "./utils/cryption.js"

export function encrypt(secret: Secret, buffer: Uint8Array, aad?: Uint8Array) {
	const version = new Uint8Array([cryption.version])
	const authenticated = bytes.concat([version, aad ?? new Uint8Array()])
	const nonce = bytes.random(cryption.nonceByteCount)
	const cipher = xchacha20poly1305(keyBytes(secret), nonce, authenticated)
	const ciphertext = cipher.encrypt(buffer)
	return bytes.concat([version, nonce, ciphertext])
}

