
import {ev, nap} from "@e280/stz"
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
	dispose
	#options
	#$user = signal<User | null>(null)

	constructor(options: Partial<AuthOptions> = {}) {
		this.#options = defaultifyAuthOptions(options)
		this.dispose = ev(this.#options.broadcastChannel, {
			message: () => nap().then(() => this.remember())
		})
	}

	/** validate and return the current session, otherwise return null. */
	get user() {
		const user = this.#$user()
		return (user && isSessionValid(user.session))
			? user
			: null
	}

	/** remember a previous login from persistent storage. */
	async remember() {
		const session = await this.#options.cubby.get()
		const user = session
			? new User(session)
			: null
		this.#$user(user)
		return this.user
	}

	/** log out immediately. */
	async logout() {
		await this.#options.cubby.set(undefined)
		this.#$user(null)
		this.#options.broadcastChannel.postMessage(true)
	}

	/** ask for a new login from the delegator */
	async loginViaPopup(options: Partial<SessionOptions> = {}) {
		const popup = openPopup("auth", this.#options.delegatorUrl)
		const delegatorOrigin = new URL(this.#options.delegatorUrl, window.location.href).origin
		const [auth, crypt] = await askForDelegates(popup, delegatorOrigin, sessionPetitions(options))
		const user = new User({auth, crypt})
		await this.#options.cubby.set(user.session)
		this.#$user(user)
		this.#options.broadcastChannel.postMessage(true)
		return this.user
	}
}

