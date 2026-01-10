
import {bytes, hex, txt} from "@e280/stz"
import {ed25519, x25519} from "@noble/curves/ed25519.js"
import {Keypair} from "./types.js"

export function keyBytes(keyHex: string) {
	const keyBytes = hex.toBytes(keyHex)
	if (keyBytes.length !== 32) throw new Error("invalid hex key")
	return keyBytes
}

export async function deriveId(secretHex: string): Promise<string> {
	const secretBytes = keyBytes(secretHex)
	const idBytes = ed25519.getPublicKey(secretBytes)
	return hex.fromBytes(idBytes)
}

export async function generateKeypair(): Promise<Keypair> {
	const secret = hex.random(32)
	const id = await deriveId(secret)
	return {id, secret}
}

async function hashCat(...byteGroups: Iterable<number>[]) {
	const data: number[] = []

	for (const [index, byteGroup] of byteGroups.entries()) {
		if (index !== 0) data.push(0x00)
		data.push(...byteGroup)
	}

	return hex.fromBytes(
		new Uint8Array(
			await crypto.subtle.digest("SHA-256", new Uint8Array(data))
		)
	)
}

export const defaultContext = ""

export async function deriveStableSecret(secretHex: string, context: string) {
	const secretBytes = keyBytes(secretHex)
	return hashCat(
		secretBytes,
		txt.toBytes(context),
	)
}

export async function deriveSharedSecret(
		aliceSecretHex: string,
		bobIdHex: string,
		context: string,
	) {
	const aliceXSecretBytes = ed25519.utils.toMontgomerySecret(hex.toBytes(aliceSecretHex))
	const bobXPubBytes = ed25519.utils.toMontgomery(hex.toBytes(bobIdHex))
	const shared = x25519.getSharedSecret(aliceXSecretBytes, bobXPubBytes)
	return hashCat(
		shared,
		txt.toBytes(context),
	)
}

export async function sign(
		message: Uint8Array,
		secret: string,
	): Promise<Uint8Array> {
	return ed25519.sign(message, keyBytes(secret))
}

export async function verify(
		message: Uint8Array,
		signature: Uint8Array,
		id: string,
	): Promise<boolean> {
	return ed25519.verify(signature, message, keyBytes(id))
}

const ivByteCount = 12

async function prepCryptionKey(hexkey: string) {
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
			await prepCryptionKey(hexkey),
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
			await prepCryptionKey(hexkey),
			ciphertext,
		)
	)
}

