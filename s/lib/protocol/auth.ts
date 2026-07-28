
import {signal} from "@e280/strata"
import {Portal} from "@e280/renraku"
import {defer, ev, nap} from "@e280/stz"
import {recvPorts, webAutoTransfer} from "@e280/renraku/web"

import {User} from "./user.js"
import {consts} from "../../consts.js"
import {Delegate} from "../core/alco/types.js"
import {openPopup} from "./parts/open-popup.js"
import {isSessionValid} from "./parts/is-session-valid.js"
import {sessionPetitions} from "./parts/session-petitions.js"
import {AuthOptions, DelegatorApi, SessionOptions} from "./types.js"
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
		if (window.crossOriginIsolated)
			throw new Error("popup flow prohibited by window.crossOriginIsolated")

		const popup = openPopup("auth", this.#options.delegatorUrl)
		const delegatorOrigin = new URL(this.#options.delegatorUrl, window.location.href).origin
		const petitions = sessionPetitions(options)
		const deferred = defer<Delegate[]>()

		const stop = recvPorts({
			from: popup,
			fromOrigin: delegatorOrigin,
			topic: consts.namespace,
			onPort: port => {
				const portal = new Portal<DelegatorApi>({
					port,
					timeout: Infinity,
					autoTransfer: webAutoTransfer,
				})
				deferred.entangle(portal.remote.v1.requestDelegates(petitions))
					.finally(() => {
						portal.close()
						popup.close()
						stop()
					})
			},
		})

		const [auth, crypt] = await deferred.promise
		const user = new User({auth, crypt})
		await this.#options.cubby.set(user.session)
		this.#$user(user)
		this.#options.broadcastChannel.postMessage(true)
		return this.user
	}
}

