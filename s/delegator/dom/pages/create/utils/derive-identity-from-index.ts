
import {consts} from "../../../../../consts.js"
import {seedId} from "../../../../../lib/core/ergo/seed/seed-id.js"
import {deriveSecret} from "../../../../../lib/core/cryp/derive-secret.js"

export function deriveIdentityFromIndex(baseSecret: string, index: number) {
	const bytes = new Uint8Array(4)
	new DataView(bytes.buffer).setInt32(0, index, false)

	const secret = deriveSecret(baseSecret, bytes)

	const seed = consts.smallSeeds
		? secret.slice(0, 32)
		: secret

	const id = seedId(seed)

	return {id, seed}
}

