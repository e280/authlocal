
import {subby} from "@e280/stz"
import {signal} from "@e280/strata"

import {User} from "../user.js"
import {mockUser} from "./user.js"
import {mockOrigin} from "./origin.js"
import {AuthLike} from "../types/auth-like.js"
import {SessionOptions} from "../types/session-options.js"
import {isSessionValid} from "../parts/is-session-valid.js"
import {generateSecret} from "../../core/cryp/generate-secret.js"

export class MockAuth implements AuthLike {
	#sub = subby<[User | null]>()
	#$user = signal<User | null>(null)

	constructor(private mockSecret = generateSecret()) {}

	get on() {
		return this.#sub.on
	}

	get user() {
		const user = this.#$user()
		return (user && isSessionValid(user.session, mockOrigin))
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
		return this.#$user(mockUser(this.mockSecret, options)) as User
	}

	dispose() {}
}

