
import {deriveId} from "../../../../../lib/core/cryp/derive-id.js"
import {deriveSecret} from "../../../../../lib/core/cryp/derive-secret.js"

export function deriveIdentityFromIndex(baseSecret: string, index: number) {
	const secret = deriveSecret(baseSecret, new Uint8Array([index]))
	const id = deriveId(secret)
	return {id, secret}
}

