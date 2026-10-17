
import {seedId} from "../../../../../lib/core/ergo/seed/seed-id.js"
import {deriveSecret} from "../../../../../lib/core/cryp/derive-secret.js"

export function deriveIdentityFromIndex(baseSecret: string, index: number) {
	const seed = deriveSecret(baseSecret, new Uint8Array([index])).slice(0, 32)
	const id = seedId(seed)
	return {id, seed}
}

