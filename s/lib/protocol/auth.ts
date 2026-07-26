
import {gotValue, time} from "@e280/stz"
import {signal} from "@e280/strata"
import {Kv, StorageMagazine} from "@e280/kv"

import {Session} from "./session.js"
import {openPopup} from "./parts/open-popup.js"
import {AuthOptions, StandardDelegates} from "./types.js"
import {generateSecret, verifyDelegate} from "../core/index.js"
import {connectToDelegator} from "./parts/connect-to-delegator.js"

export class Auth {
	#cubby
	#delegatorUrl
	#delegatorOrigin
	#session = signal<Session | null>(null)

	constructor({
			delegatorUrl = "https://authlocal.org/",
			cubby = new Kv(new StorageMagazine())
				.scope("authlocal")
				.cell<StandardDelegates>("delegates"),
		}: Partial<AuthOptions> = {}) {
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
			this.#session(new Session(delegates))
			return this.session
		}
		return null
	}

	async logout() {
		this.#session(null)
		await this.#cubby.set(undefined)
	}

	async loginViaPopup({encryptionScope = ""}: {encryptionScope?: string} = {}) {
		const popup = openPopup("auth", this.#delegatorUrl)
		const portal = await connectToDelegator(popup)

		const freshDelegates = await portal.remote.requestDelegates([
			{purpose: "login", scope: generateSecret(), expiresAt: time.future.days(30)},
			{purpose: "", scope: "v1:" + encryptionScope, expiresAt: time.future.days(30)},
		])

		portal.close()
		popup.close()

		const [login, encryption] = freshDelegates.map(d => gotValue(verifyDelegate(d, {
			allowedDelegators: [this.#delegatorOrigin],
			allowedPetitioners: [window.location.origin],
		})))

		const session = new Session({login, encryption})
		await this.#cubby.set(session.delegates)
		this.#session(session)
		return session
	}
}

