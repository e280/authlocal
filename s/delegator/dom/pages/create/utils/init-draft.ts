
import {signal} from "@e280/strata"
import {CreateDraft} from "../types.js"
import {deriveIdentityFromIndex} from "./derive-identity-from-index.js"
import {generateSecret} from "../../../../../lib/core/cryp/generate-secret.js"

export function initDraft(): CreateDraft {
	const startIndex = 1
	const baseSecret = generateSecret()
	const {seed} = deriveIdentityFromIndex(baseSecret, startIndex)

	return {
		$baseSecret: signal(baseSecret),
		$index: signal(startIndex),
		$seed: signal(seed),
		$alias: signal<string>(""),
	}
}

