
import {bytes} from "@e280/stz"
import {xchacha20poly1305} from "@awasm/noble"
import {Secret} from "./types.js"
import {keyBytes} from "./key-bytes.js"
import {cryption} from "./utils/cryption.js"
import {CryptionErr} from "../errs/cryption-err.js"

export function decrypt(secret: Secret, buffer: Uint8Array, aad?: Uint8Array) {
	const minimum = cryption.versionLength + cryption.nonceByteCount + cryption.tagLength

	if (buffer.length < minimum)
		throw new CryptionErr("buffer too small")

	const version = buffer.at(0)
	const rest = buffer.slice(1)

	switch (version) {
		case cryption.version: break
		default: throw new CryptionErr("unsupported version")
	}

	const nonce = rest.slice(0, cryption.nonceByteCount)
	const ciphertext = rest.slice(cryption.nonceByteCount)
	const authenticated = bytes.concat([
		new Uint8Array([version]),
		aad ?? new Uint8Array(),
	])

	const key = new Uint8Array(keyBytes(secret))
	const cipher = xchacha20poly1305(key, nonce, authenticated)

	return cipher.decrypt(ciphertext)
}

