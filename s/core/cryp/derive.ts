
import {hex} from "@e280/stz"
import {ed25519, x25519} from "@noble/curves/ed25519.js"

import {hash} from "./hashing.js"
import {keyBytes} from "./kit.js"
import {Id, Secret, Scope} from "./types.js"

export function deriveId(secret: Secret): Id {
	const secretBytes = keyBytes(secret)
	const idBytes = ed25519.getPublicKey(secretBytes)
	return hex.fromBytes(idBytes)
}

export function deriveScopedSecret(secret: Secret, scope: Scope): Secret {
	return hash(secret, scope)
}

export function deriveSharedSecret(aliceSecret: Secret, bobId: Id): Secret {
	const aliceXSecretBytes = ed25519.utils.toMontgomerySecret(hex.toBytes(aliceSecret))
	const bobXPubBytes = ed25519.utils.toMontgomery(hex.toBytes(bobId))
	return hex.fromBytes(x25519.getSharedSecret(aliceXSecretBytes, bobXPubBytes))
}

