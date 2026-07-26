
import {time} from "@e280/stz"
import {consts} from "../../../consts.js"
import {Petition} from "../../core/alco/types.js"
import {StandardPetitionOptions} from "../types.js"
import {generateSecret} from "../../core/cryp/generate-secret.js"

export function standardPetitions({
		expiresAt = time.future.days(consts.standardExpiryDays),
		encryptionScope = consts.standardEncryptionScope,
	}: Partial<StandardPetitionOptions>): Petition[] {

	return [
		{purpose: "login", expiresAt, scope: generateSecret()},
		{purpose: "encryption", expiresAt, scope: "v1:" + encryptionScope},
	]
}

