
import {consts} from "../../../consts.js"
import {Petition} from "../../core/alco/delegate/types.js"
import {SessionOptions} from "../types/session-options.js"
import {generateSecret} from "../../core/cryp/generate-secret.js"

export function sessionPetitions({
		expiresAt = Date.now() + consts.standardLifespan,
		cryptScope = consts.standardCryptScope,
	}: Partial<SessionOptions>): Petition[] {

	return [
		{purpose: consts.purposes.auth, scope: generateSecret(), expiresAt},
		{purpose: consts.purposes.crypt, scope: cryptScope},
	]
}

