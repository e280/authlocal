
import {hex} from "@e280/stz"
import {blake3} from "@awasm/noble"
import {Secret} from "./types.js"
import {keyBytes} from "./key-bytes.js"

export function deriveSecret(secret: Secret, message: Uint8Array) {
	return hex(blake3(message, {key: keyBytes(secret)}))
}

