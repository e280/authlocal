
import {Kv, StorageMagazine} from "@e280/kv"
import {signal} from "@e280/strata"
import {Cubby, defer, time} from "@e280/stz"
import {StandardDelegates} from "./types.js"
import {AuthSession} from "./auth-session.js"
import {openPopup} from "./utils/open-popup.js"
import {connectToDelegator} from "./parts/connect-to-delegator.js"
import {Delegate, generateSecret, verifyDelegate} from "../core/index.js"

export class Auth {
	#cubby
	#delegatorUrl
	#delegatorOrigin
	#session = signal<AuthSession | null>(null)

	constructor({
			delegatorUrl = "https://authlocal.org/",
			cubby = new Kv(new StorageMagazine()).scope("authlocal").cell<StandardDelegates>("delegates"),
		}: {
			delegatorUrl?: string
			cubby?: Cubby<StandardDelegates>
		} = {}) {
		this.#cubby = cubby
		this.#delegatorUrl = delegatorUrl
		this.#delegatorOrigin = new URL(delegatorUrl, window.location.href).origin
	}

	get session() {
		const session = this.#session()
		if (session) {
			try {
				verifyDelegate(session.delegates.login, {
					allowedDelegators: [this.#delegatorOrigin],
					allowedPetitioners: [window.location.origin],
				})
				return session
			}
			catch {}
		}
		return null
	}

	async remember() {
		const delegates = await this.#cubby.get()
		if (delegates) {
			this.#session(new AuthSession(delegates))
			return this.session
		}
		return null
	}

	async loginViaPopup({encryptionSalt = ""}: {encryptionSalt?: string} = {}) {
		const session = defer<AuthSession>()
		const popup = openPopup("auth", this.#delegatorUrl)

		const delegator = await connectToDelegator(popup, {
			deliverDelegates: async delegates => {
				const [login, encryption] = delegates.map((delegate: Delegate) =>
					verifyDelegate(delegate, {
						allowedPetitioners: [window.location.origin],
						allowedDelegators: [this.#delegatorOrigin],
					})
				)
				session.resolve(new AuthSession({login, encryption}))
				popup.close()
			},
		})

		await delegator.requestDelegates([
			{scope: "login:" + generateSecret(), expiresAt: time.future.days(30)},
			{scope: "encryption:" + encryptionSalt, expiresAt: time.future.days(30)},
		])

		return session.promise.then(async session => {
			await this.#cubby.set(session.delegates)
			this.#session(session)
			return session
		})
	}
}

