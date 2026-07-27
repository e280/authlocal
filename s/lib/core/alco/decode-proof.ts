
import {Proof} from "./types.js"
import {Payload} from "../tok/types.js"
import {decodeToken} from "../tok/decode-token.js"

export function decodeProof(token: string) {
	return decodeToken<Payload<{proof: Proof}>>(token).payload.proof
}

