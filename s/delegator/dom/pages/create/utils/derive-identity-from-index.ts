
import {deriveId} from "../../../../../lib/core/cryp/derive-id.js"
import {deriveSecret} from "../../../../../lib/core/cryp/derive-secret.js"

export function deriveIdentityFromIndex(secret: string, index: number) {
	const root = deriveSecret(secret, new Uint8Array([index]))
	const id = deriveId(root)
	return {id, root}
}

