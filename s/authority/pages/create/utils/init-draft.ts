
import {signal} from "@e280/strata"
import {generateSecret} from "../../../../core/index.js"
import {deriveIdentityFromIndex} from "./derive-identity-from-index.js"

export function initDraft() {
	const startIndex = 1
	const secret = generateSecret()
	const {root} = deriveIdentityFromIndex(secret, startIndex)

	return {
		$index: signal(startIndex),
		$secret: signal(secret),
		$root: signal(root),
		$name: signal<string>(""),
	}
}

