
import {scopes} from "./scopes.js"
import {Viceroy} from "./types.js"
import {hash} from "../cryp/hash.js"
import {Root} from "../cryp/types.js"
import {deriveSecret} from "../cryp/derive-secret.js"

export function deriveViceroy(root: Root, appOrigin: string): Viceroy {
	return deriveSecret(root, hash(scopes.viceroy, appOrigin))
}

