
import {signal} from "@e280/strata"
import {deriveIdentityFromIndex} from "./derive-identity-from-index.js"
import {generateSecret} from "../../../../../lib/core/cryp/generate-secret.js"

export function initDraft() {
	const startIndex = 1
	const secret = generateSecret()
	const {root} = deriveIdentityFromIndex(secret, startIndex)

	return {
		$index: signal(startIndex),
		$secret: signal(secret),
		$root: signal(root),
		$alias: signal<string>(""),
	}
}
