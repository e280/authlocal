
import {hash} from "./hash.js"
import {Secret, Scope} from "./types.js"

export function deriveScopedSecret(secret: Secret, scope: Scope): Secret {
	return hash(secret, scope)
}

