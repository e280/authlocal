
import {bytes} from "@e280/stz"
import {xchacha20poly1305} from "@noble/ciphers/chacha.js"

import {keyBytes} from "./kit.js"
import {Secret} from "./types.js"

const nonceByteCount = 24

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

export function decrypt(secret: Secret, buffer: Uint8Array, aad?: Uint8Array) {
	if (buffer.length < nonceByteCount)
		throw new Error("invalid data byte count, less than required nonce")

	const nonce = buffer.slice(0, nonceByteCount)
	const ciphertext = buffer.slice(nonceByteCount)

	const key = new Uint8Array(keyBytes(secret))
	const cipher = xchacha20poly1305(key, nonce, aad)

	return cipher.decrypt(ciphertext)
}

