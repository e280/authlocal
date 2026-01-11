
import {bytes} from "@e280/stz"
import {keyBytes} from "./kit.js"

const ivByteCount = 12

async function prepKey(hexkey: string) {
	return crypto.subtle.importKey(
		"raw",
		new Uint8Array(keyBytes(hexkey)),
		{name: "AES-GCM"},
		false,
		["encrypt", "decrypt"],
	)
}

export async function encrypt(hexkey: string, data: Iterable<number>) {
	const iv = bytes.random(ivByteCount)

	const ciphertext = new Uint8Array(
		await crypto.subtle.encrypt(
			{name: "AES-GCM", iv},
			await prepKey(hexkey),
			new Uint8Array(data),
		)
	)

	return new Uint8Array([...iv, ...ciphertext])
}

export async function decrypt(hexkey: string, data: Uint8Array) {
	if (data.length < ivByteCount)
		throw new Error("invalid data byte count, less than required iv")

	const iv = data.slice(0, ivByteCount)
	const ciphertext = data.slice(ivByteCount)

	return new Uint8Array(
		await crypto.subtle.decrypt(
			{name: "AES-GCM", iv},
			await prepKey(hexkey),
			ciphertext,
		)
	)
}

