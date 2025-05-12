
import {sub} from "@e280/stz"
import {signal} from "@benev/slate"

import {AuthOptions} from "./types.js"
import {defaults} from "./parts/defaults.js"
import {AuthStores} from "./parts/stores.js"
import {Login} from "../core/exports/consumer.js"
import {openPopup} from "./parts/open-popup.js"
import {setupInApp} from "../core/postmessage/setup-in-app.js"
import {Session} from "../core/exports/authority.js"
import {nullcatch} from "../common/utils/nullcatch.js"

/**
 * Authlocal's page-level auth control center.
 *  - there should only be one instance on the page, shared across any authlocal elements.
 *  - provides the `login` state
 *  - handles persistence of the login session into storage
 *  - coordinates and communicates with the Authlocal popup
 */
export class Auth {
	static version = 1
	static defaults = defaults

	/** The url that the login popups should use (defaults to "https://authlocal.org/") */
	src: string

	/**
	 * Subscribe to changes in the login state.
	 *  - if the login is `null`, it means the user has logged out.
	 *  - usage:
	 *    auth.on(login => console.log(login))
	 */
	on = sub<[Login | null]>()

	#options: AuthOptions
	#stores: AuthStores
	#ready: Promise<void>
	#login = signal<Login | null>(null)

	constructor(options: Partial<AuthOptions> = {}) {
		this.#options = Auth.defaults(options)
		this.src = this.#options.src
		this.#stores = new AuthStores(this.#options.kv)
		this.#ready = this.#stores.versionMigration(Auth.version)
		this.#login.on(login => this.on.pub(login))
		this.#options.onStorageChange(() => void this.loadLogin())
	}

	/** Load and update the login state from storage */
	async loadLogin(): Promise<Login | null> {
		const login = await this.#getStoredLogin()
		return this.#updateLoginSignal(login)
	}

	/** Set the login state manually, saving it to storage */
	async saveLogin(login: Login | null) {
		const login2 = await this.#setStoredLogin(login)
		return this.#updateLoginSignal(login2)
	}

	/** Shortcut for `saveLogin(null)` */
	async logout() {
		return this.saveLogin(null)
	}

	/** The current login state, either a `Login` object, or null if logged out */
	get login() {
		const login = this.#login.value
		if (login && login.isExpired())
			this.#login.value = null
		return this.#login.value
	}

	/**
	 * Spawn a login popup, requesting for the user to login.
	 *   `src`:
	 *     this is the url to open (defaults to "https://authlocal.org/")
	 */
	async popup(src = this.src) {
		const popupWindow = openPopup(src)
		const popupOrigin = new URL(src, window.location.href).origin

		if (!popupWindow)
			return null

		return new Promise<Login | null>((resolve, reject) => {
			const appWindow = window
			const {dispose} = setupInApp(
				appWindow,
				popupWindow,
				popupOrigin,
				async session => {
					popupWindow.close()
					if (!session)
						return undefined
					try {
						const login = await this.#verify(session)
						await this.saveLogin(login)
						dispose()
						resolve(login)
					}
					catch (err) {
						dispose()
						reject(err)
					}
				},
			)
			popupWindow.onclose = () => {
				dispose()
				resolve(this.login)
			}
		})
	}

	#updateLoginSignal(login: Login | null) {
		const hasChanged = login?.sessionId !== this.#login.value?.sessionId
		if (hasChanged)
			this.#login.value = login
		return login
	}

	async #verify(session: Session) {
		return nullcatch(async() => Login.verify({
			session,
			appOrigins: [window.origin],
		}))
	}

	async #getStoredLogin() {
		await this.#ready
		const session = await this.#stores.session.get()
		if (!session) return null
		return this.#verify(session)
	}

	async #setStoredLogin(login: Login | null) {
		await this.#ready
		const session = login?.session
		await this.#stores.session.set(session)
		return login
	}
}

