
import {scopes} from "./scopes.js"
import {Viceroy} from "./types.js"
import {hash} from "../cryp/hash.js"
import {Root} from "../cryp/types.js"
import {deriveScopedSecret} from "../cryp/derive-scoped-secret.js"

export function deriveViceroy(root: Root, appOrigin: string): Viceroy {
	return deriveScopedSecret(root, hash(scopes.viceroy, appOrigin))
}

