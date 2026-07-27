
import {time} from "@e280/stz"
import {consts} from "../../../consts.js"
import {SessionOptions} from "../types.js"
import {Petition} from "../../core/alco/types.js"
import {generateSecret} from "../../core/cryp/generate-secret.js"

export function sessionPetitions({
		expiresAt = time.future.days(consts.standardExpiryDays),
		encryptionScope = consts.standardEncryptionScope,
	}: Partial<SessionOptions>): Petition[] {

	return [
		{purpose: consts.purposes.auth, expiresAt, scope: generateSecret()},
		{purpose: consts.purposes.crypt, expiresAt, scope: encryptionScope},
	]
}

