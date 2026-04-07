
import {bytes} from "@e280/stz"
import {xchacha20poly1305} from "@noble/ciphers/chacha.js"
import {keyBytes} from "./key-bytes.js"
import {Secret} from "./types.js"
import {nonceByteCount} from "./parts/nonce-byte-count.js"

export function encrypt(secret: Secret, buffer: Uint8Array, aad?: Uint8Array) {
	const nonce = bytes.random(nonceByteCount)
	const key = new Uint8Array(keyBytes(secret))

	const cipher = xchacha20poly1305(key, nonce, aad)
	const ciphertext = cipher.encrypt(new Uint8Array(buffer))

	const out = new Uint8Array(nonceByteCount + ciphertext.length)
	out.set(nonce, 0)
	out.set(ciphertext, nonceByteCount)
	return out
}

