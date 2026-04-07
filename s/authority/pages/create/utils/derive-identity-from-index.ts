
import {deriveId, deriveSecret} from "../../../../lib/index.js"

export function deriveIdentityFromIndex(secret: string, index: number) {
	const root = deriveSecret(secret, new Uint8Array([index]))
	const id = deriveId(root)
	return {id, root}
}

