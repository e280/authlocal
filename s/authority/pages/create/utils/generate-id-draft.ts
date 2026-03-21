
import {deriveSecret} from "../../../../core/index.js"

export function deriveIndexedDraftRoot(secret: string, index: number) {
		const b = new Uint8Array([index])
		return deriveSecret(secret, b)
}

