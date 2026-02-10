
import {hex, txt} from "@e280/stz"
import {ed25519, x25519} from "@noble/curves/ed25519.js"

import {hashBytes, keyBytes} from "./kit.js"
import {Id, Secret, Root, Purpose} from "./types.js"

export async function deriveId(secret: Secret): Promise<Id> {
	const idBytes = ed25519.getPublicKey(keyBytes(secret))
	return hex.fromBytes(idBytes)
}

export async function deriveSecret(root: Root, purpose: Purpose): Promise<Secret> {
	return hashBytes(
		keyBytes(root),
		txt.toBytes(purpose),
	)
}

export async function deriveSharedSecret(
		aliceSecret: Secret,
		bobId: Id,
		purpose: Purpose,
	): Promise<Secret> {

	const aliceXSecretBytes = ed25519.utils.toMontgomerySecret(hex.toBytes(aliceSecret))
	const bobXPubBytes = ed25519.utils.toMontgomery(hex.toBytes(bobId))
	const shared = x25519.getSharedSecret(aliceXSecretBytes, bobXPubBytes)

	return hashBytes(
		shared,
		txt.toBytes(purpose),
	)
}

