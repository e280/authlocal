
import {signal} from "@e280/strata"
import {Session} from "./session.js"
import {AuthOptions, StandardPetitionOptions} from "./types.js"
import {openPopup} from "./parts/open-popup.js"
import {isSessionValid} from "./parts/is-session-valid.js"
import {defaultifyAuthOptions} from "./parts/defaultify-auth-options.js"
import {askForDelegates} from "./parts/ask-for-delegates.js"
import { standardPetitions } from "./parts/standard-petitions.js"

/** auth facility for logging in and out. */
export class Auth {
	#options
	#$session = signal<Session | null>(null)

	constructor(options: Partial<AuthOptions> = {}) {
		this.#options = defaultifyAuthOptions(options)
	}

	/** validate and return the current session, otherwise return null. */
	get session() {
		const session = this.#$session()
		return (session && isSessionValid(session))
			? session
			: null
	}

	/** remember a previous login from persistent storage. */
	async remember() {
		const delegates = await this.#options.cubby.get()
		if (!delegates) return null
		this.#$session(new Session(delegates))
		return this.session
	}

	/** log out immediately. */
	async logout() {
		this.#$session(null)
		await this.#options.cubby.set(undefined)
	}

	/** ask for a new login from the delegator */
	async loginViaPopup(options: Partial<StandardPetitionOptions> = {}) {
		const popup = openPopup("auth", this.#options.delegatorUrl)
		const delegates = await askForDelegates(popup, standardPetitions(options))
		const session = new Session(delegates)
		await this.#options.cubby.set(session.delegates)
		this.#$session(session)
		return this.session
	}
}

