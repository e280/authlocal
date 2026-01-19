
import {hex, txt} from "@e280/stz"
import {ed25519, x25519} from "@noble/curves/ed25519.js"

import {Hex, Id} from "./types.js"
import {hashCat, keyBytes} from "./kit.js"

export async function deriveId(secret: Hex): Promise<Id> {
	const secretBytes = keyBytes(secret)
	const idBytes = ed25519.getPublicKey(secretBytes)
	return hex.fromBytes(idBytes)
}

export async function deriveSecret(secret: string, context: string) {
	const secretBytes = keyBytes(secret)
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

