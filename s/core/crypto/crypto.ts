
import {hex, txt} from "@e280/stz"
import {ed25519, x25519} from "@noble/curves/ed25519.js"
import {Keypair} from "./types.js"

export function unpackKey(keyHex: string) {
	const keyBytes = hex.toBytes(keyHex)
	if (keyBytes.length !== 32) throw new Error("invalid hex key")
	return keyBytes
}

export async function deriveId(secretHex: string): Promise<string> {
	const secretBytes = unpackKey(secretHex)
	const idBytes = ed25519.getPublicKey(secretBytes)
	return hex.fromBytes(idBytes)
}

export async function generateKeypair(): Promise<Keypair> {
	const secret = hex.random(32)
	const id = await deriveId(secret)
	return {id, secret}
}

export async function deriveSharedSecret(
		aliceSecretHex: string,
		bobIdHex: string,
		appOrigin: string,
		salt: string,
	) {
	const aliceXSecretBytes = ed25519.utils.toMontgomerySecret(hex.toBytes(aliceSecretHex))
	const bobXPubBytes = ed25519.utils.toMontgomery(hex.toBytes(bobIdHex))
	const shared = x25519.getSharedSecret(aliceXSecretBytes, bobXPubBytes)
	return hex.fromBytes(new Uint8Array(
		await crypto.subtle.digest("SHA-256", new Uint8Array([
			...txt.toBytes(appOrigin),
			...txt.toBytes(salt),
			...shared,
		]))
	))
}

export async function sign(
		message: Uint8Array,
		secret: string,
	): Promise<Uint8Array> {
	return ed25519.sign(message, unpackKey(secret))
}

export async function verify(
		message: Uint8Array,
		signature: Uint8Array,
		id: string,
	): Promise<boolean> {
	return ed25519.verify(signature, message, unpackKey(id))
}

