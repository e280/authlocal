
import {scopes} from "./scopes.js"
import {Viceroy} from "./types.js"
import {Root} from "../cryp/types.js"
import {hash} from "../cryp/hashing.js"
import {deriveScopedSecret} from "../cryp/derive.js"

export function deriveViceroy(root: Root, appOrigin: string): Viceroy {
	return deriveScopedSecret(root, hash(scopes.viceroy, appOrigin))
}

