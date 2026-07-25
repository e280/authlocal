
import {signal} from "@e280/strata"
import {Cubby, time} from "@e280/stz"
import {Kv, StorageMagazine} from "@e280/kv"
import {StandardDelegates} from "./types.js"
import {AuthSession} from "./auth-session.js"
import {openPopup} from "./parts/open-popup.js"
import {generateSecret, verifyDelegate} from "../core/index.js"
import {connectToDelegator} from "./parts/connect-to-delegator.js"

export class Auth {
	#cubby
	#delegatorUrl
	#delegatorOrigin
	#session = signal<AuthSession | null>(null)

	constructor({
			delegatorUrl = "https://authlocal.org/",
			cubby = new Kv(new StorageMagazine())
				.scope("authlocal")
				.cell<StandardDelegates>("delegates"),
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

	async logout() {
		this.#session(null)
		await this.#cubby.set(undefined)
	}

	async loginViaPopup({encryptionSalt = ""}: {encryptionSalt?: string} = {}) {
		const popup = openPopup("auth", this.#delegatorUrl)
		const portal = await connectToDelegator(popup)

		const freshDelegates = await portal.remote.requestDelegates([
			{scope: "login:" + generateSecret(), expiresAt: time.future.days(30)},
			{scope: "encryption:" + encryptionSalt, expiresAt: time.future.days(30)},
		])

		portal.close()
		popup.close()

		const [login, encryption] = freshDelegates.map(d => verifyDelegate(d, {
			allowedDelegators: [this.#delegatorOrigin],
			allowedPetitioners: [window.location.origin],
		}))

		const session = new AuthSession({login, encryption})
		await this.#cubby.set(session.delegates)
		this.#session(session)
		return session
	}
}

