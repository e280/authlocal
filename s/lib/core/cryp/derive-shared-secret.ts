
import {hex} from "@e280/stz"
import {ed25519, x25519} from "@noble/curves/ed25519.js"
import {Id, Secret} from "./types.js"
import {keyBytes} from "./key-bytes.js"

export function deriveSharedSecret(aliceSecret: Secret, bobId: Id): Secret {
	const aliceXSecretBytes = ed25519.utils.toMontgomerySecret(keyBytes(aliceSecret))
	const bobXPubBytes = ed25519.utils.toMontgomery(keyBytes(bobId))
	return hex.fromBytes(x25519.getSharedSecret(aliceXSecretBytes, bobXPubBytes))
}

