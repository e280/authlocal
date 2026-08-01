
import {signal} from "@e280/strata"
import {disposer, sub} from "@e280/stz"

import {User} from "./user.js"
import {AuthLike} from "./types/auth-like.js"
import {deriveId} from "../core/cryp/derive-id.js"
import {SessionOptions} from "./types/session-options.js"
import {signDelegate} from "../core/alco/delegate/sign.js"
import {isSessionValid} from "./parts/is-session-valid.js"
import {sessionPetitions} from "./parts/session-petitions.js"
import {generateSecret} from "../core/cryp/generate-secret.js"
import {addressMoniker} from "../core/ergo/address/moniker.js"

export class MockAuth implements AuthLike {
	dispose = disposer()
	on = sub<[User | null]>()
	#$user = signal<User | null>(null)

	constructor(private mockSecret = generateSecret()) {}

	get user() {
		const user = this.#$user()
		return (user && isSessionValid(user.session))
			? user
			: null
	}

	async remember() {
		return null
	}

	async logout() {
		this.#$user(null)
	}

	async loginViaPopup(options: Partial<SessionOptions> = {}) {
		const id = deriveId(this.mockSecret)
		const alias = addressMoniker(id)
		const [auth, crypt] = sessionPetitions(options).map(petition => signDelegate(this.mockSecret, {
			alias,
			petition,
			issuer: window.location.origin,
			audience: window.location.origin,
		}))
		const user = new User({auth, crypt})
		this.#$user(user)
		return user
	}
}

