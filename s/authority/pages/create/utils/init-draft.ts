
import {signal} from "@e280/strata"
import {generateSecret} from "../../../../core/index.js"
import {deriveIndexedDraftRoot} from "./derive-indexed-draft-root.js"

export function initDraft() {
	const startPage = 1
	const secret = generateSecret()
	const root = deriveIndexedDraftRoot(secret, startPage)

	return {
		$name: signal("Anon Anonymous"),
		$root: signal(root),
		$secret: signal(secret),
		$page: signal(startPage),
	}
}

