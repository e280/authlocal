
import {Hex} from "@benev/slate"
import * as ed from "@noble/ed25519"

export function unpack(key: string) {
	const bytes = Hex.bytes(key)
	if (bytes.length !== 32)
		throw new Error("invalid key")
	return bytes
}

export async function deriveId(secret: string): Promise<string> {
	const secretBytes = unpack(secret)
	const idBytes = await ed.getPublicKeyAsync(secretBytes)
	return Hex.string(idBytes)
}

export async function signMessage(
		message: Uint8Array,
		secret: string,
	): Promise<Uint8Array> {
	return ed.signAsync(message, unpack(secret))
}

export async function verifyMessage(
		message: Uint8Array,
		signature: Uint8Array,
		id: string,
	): Promise<boolean> {
	return ed.verifyAsync(signature, message, unpack(id))
}

