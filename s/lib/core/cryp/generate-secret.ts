
import {hex} from "@e280/stz"
import {Secret} from "./types.js"

/** generate a secret hex key, 32 bytes, 64 characters */
export function generateSecret(): Secret {
	return hex.random(32)
}

