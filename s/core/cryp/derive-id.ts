
import {hex} from "@e280/stz"
import {ed25519} from "@noble/curves/ed25519.js"

import {keyBytes} from "./key-bytes.js"
import {Id, Secret} from "./types.js"

export function deriveId(secret: Secret): Id {
	const secretBytes = keyBytes(secret)
	const idBytes = ed25519.getPublicKey(secretBytes)
	return hex.fromBytes(idBytes)
}

