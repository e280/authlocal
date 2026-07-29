
import {afterEffect, signal} from "@e280/strata"
import {disposer, ev, nap, sub} from "@e280/stz"

import {User} from "./user.js"
import {openPopup} from "./parts/open-popup.js"
import {AuthOptions, SessionOptions} from "./types.js"
import {isSessionValid} from "./parts/is-session-valid.js"
import {sessionPetitions} from "./parts/session-petitions.js"
import {waitForDelegates} from "./parts/wait-for-delegates.js"
import {defaultAuthOptions} from "./parts/default-auth-options.js"

/** auth facility for logging in and out. */
export class Auth {
	dispose = disposer()
	on = sub<[User | null]>()
	#options
	#$user = signal<User | null>(null)

	constructor(options: Partial<AuthOptions> = {}) {
		this.#options = defaultAuthOptions(options)

		this.dispose.schedule(
			ev(this.#options.broadcastChannel, {
				message: () => nap().then(() => this.remember())
			})
		)

		this.dispose.schedule(
			afterEffect(
				() => this.#$user(),
				user => this.on.publish(user),
			)
		)
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
		const session = await this.#options.sessionCubby.get()
		const user = session
			? new User(session)
			: null
		this.#$user(user)
		return this.user
	}

	/** log out immediately. */
	async logout() {
		await this.#options.sessionCubby.set(undefined)
		this.#$user(null)
		this.#options.broadcastChannel.postMessage(true)
	}

	/** ask for a new login from the delegator */
	async loginViaPopup(options: Partial<SessionOptions> = {}) {
		if (window.crossOriginIsolated)
			throw new Error("popup flow prohibited by window.crossOriginIsolated")

		const petitions = sessionPetitions(options)
		const delegatorOrigin = new URL(this.#options.delegatorUrl, window.location.href).origin

		const popup = openPopup("auth", this.#options.delegatorUrl)
		const [auth, crypt] = await waitForDelegates(popup, delegatorOrigin, petitions)

		const user = new User({auth, crypt})
		await this.#options.sessionCubby.set(user.session)
		this.#$user(user)
		this.#options.broadcastChannel.postMessage(true)
		return this.user
	}
}

