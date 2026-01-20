
import {hex, txt} from "@e280/stz"
import {ed25519, x25519} from "@noble/curves/ed25519.js"

import {Id, Secret, Seed} from "./types.js"
import {hashCat, keyBytes} from "./kit.js"

export async function deriveId(secret: Secret): Promise<Id> {
	const idBytes = ed25519.getPublicKey(keyBytes(secret))
	return hex.fromBytes(idBytes)
}

export async function deriveSecret(seed: Seed, context: string) {
	return hashCat(
		keyBytes(seed),
		txt.toBytes(context),
	)
}

export async function deriveSharedSecret(
		aliceSecretHex: Secret,
		bobIdHex: Id,
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

