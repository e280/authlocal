
import {Hex} from "@benev/slate"
import * as ed from "@noble/ed25519"
import {Passport, Secret, Seed} from "./types.js"

export async function thumbprint(pubkey: string) {
	const pubkeyBytes = Hex.bytes(pubkey)
	const hash = await crypto.subtle.digest("SHA-256", pubkeyBytes)
	const bytes = new Uint8Array(hash)
	return Hex.string(bytes)
}

export async function verifyPassport({pubkey, id}: Passport): Promise<Passport> {
	const realId = await thumbprint(pubkey)
	if (realId !== id)
		throw new Error("invalid passport")
	return {pubkey, id: realId}
}

export async function hydrate(seed: Seed): Promise<Secret> {
	const seedBytes = Hex.bytes(seed)
	if (seedBytes.length !== 32)
		throw new Error("invalid seed")
	const pubkeyBytes = await ed.getPublicKeyAsync(seedBytes)
	const pubkey = Hex.string(pubkeyBytes)
	const id = await thumbprint(pubkey)
	return {seed, passport: {id, pubkey}}
}

export async function signMessage(message: Uint8Array, seed: Seed): Promise<Uint8Array> {
	const seedBytes = Hex.bytes(seed)
	return ed.signAsync(message, seedBytes)
}

export async function verifyMessage(message: Uint8Array, signature: Uint8Array, passport: Passport): Promise<boolean> {
	const pubkeyBytes = Hex.bytes(passport.pubkey)
	return ed.verifyAsync(signature, message, pubkeyBytes)
}

