
import {User} from "../user.js"
import {mockOrigin} from "./origin.js"
import {deriveId} from "../../core/cryp/derive-id.js"
import {SessionOptions} from "../types/session-options.js"
import {signDelegate} from "../../core/alco/delegate/sign.js"
import {sessionPetitions} from "../parts/session-petitions.js"
import {generateSecret} from "../../core/cryp/generate-secret.js"
import {addressMoniker} from "../../core/ergo/address/moniker.js"

export function mockUser(
		mockSecret = generateSecret(),
		options: Partial<SessionOptions> = {},
	) {

	const id = deriveId(mockSecret)
	const alias = addressMoniker(id)

	const [auth, crypt] = sessionPetitions(options)
		.map(petition => signDelegate(mockSecret, {
			alias,
			petition,
			issuer: mockOrigin,
			audience: mockOrigin,
		}))

	return new User({auth, crypt})
}

