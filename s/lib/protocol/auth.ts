
import {signal} from "@e280/strata"
import {User} from "./user.js"
import {openPopup} from "./parts/open-popup.js"
import {AuthOptions, SessionOptions} from "./types.js"
import {isSessionValid} from "./parts/is-session-valid.js"
import {askForDelegates} from "./parts/ask-for-delegates.js"
import {sessionPetitions} from "./parts/session-petitions.js"
import {defaultifyAuthOptions} from "./parts/defaultify-auth-options.js"

/** auth facility for logging in and out. */
export class Auth {
	#options
	#$user = signal<User | null>(null)

	constructor(options: Partial<AuthOptions> = {}) {
		this.#options = defaultifyAuthOptions(options)
	}

	/** validate and return the current session, otherwise return null. */
	get user() {
		const user = this.#$user()
		return (user && isSessionValid(user))
			? user
			: null
	}

	/** remember a previous login from persistent storage. */
	async remember() {
		const delegates = await this.#options.cubby.get()
		if (!delegates) return null
		this.#$user(new User(delegates))
		return this.user
	}

	/** log out immediately. */
	async logout() {
		this.#$user(null)
		await this.#options.cubby.set(undefined)
	}

	/** ask for a new login from the delegator */
	async loginViaPopup(options: Partial<SessionOptions> = {}) {
		const popup = openPopup("auth", this.#options.delegatorUrl)
		const [login, encryption] = await askForDelegates(popup, sessionPetitions(options))
		const user = new User({login, encryption})
		await this.#options.cubby.set(user.session)
		this.#$user(user)
		return this.user
	}
}

