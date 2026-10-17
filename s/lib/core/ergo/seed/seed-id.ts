
import {secretize} from "./secretize.js"
import {deriveId} from "../../cryp/derive-id.js"

export function seedId(seed: string) {
	return deriveId(secretize(seed))
}

