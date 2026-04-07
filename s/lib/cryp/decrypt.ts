
import {xchacha20poly1305} from "@noble/ciphers/chacha.js"
import {Secret} from "./types.js"
import {keyBytes} from "./key-bytes.js"
import {nonceByteCount} from "./parts/nonce-byte-count.js"

export function decrypt(secret: Secret, buffer: Uint8Array, aad?: Uint8Array) {
	if (buffer.length < nonceByteCount)
		throw new Error("invalid data byte count, less than required nonce")

	const nonce = buffer.slice(0, nonceByteCount)
	const ciphertext = buffer.slice(nonceByteCount)

	const key = new Uint8Array(keyBytes(secret))
	const cipher = xchacha20poly1305(key, nonce, aad)

	return cipher.decrypt(ciphertext)
}

