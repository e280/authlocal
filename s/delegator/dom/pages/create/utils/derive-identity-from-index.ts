
import {deriveId} from "../../../../../lib/core/cryp/derive-id.js"
import {deriveSecret} from "../../../../../lib/core/cryp/derive-secret.js"
import {secretize} from "../../../../../lib/core/ergo/seed/secretize.js"

export function deriveIdentityFromIndex(baseSecret: string, index: number) {
	const seed = deriveSecret(baseSecret, new Uint8Array([index])).slice(0, 32)
	const id = deriveId(secretize(seed))
	return {id, seed}
}

