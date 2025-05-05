
import {sub} from "@e280/stz"
import {signal} from "@benev/slate"

import {Login} from "../core/login.js"
import {AuthOptions} from "./types.js"
import {Session} from "../core/session.js"
import {defaults} from "./parts/defaults.js"
import {AuthStores} from "./parts/stores.js"
import {openPopup} from "./parts/open-popup.js"
import {AuthSingleton} from "./parts/singleton.js"
import {nullcatch} from "../common/utils/nullcatch.js"
import {setupInApp} from "../manager/fed-api/setup-in-app.js"

export class Auth {
	static version = 1
	static defaults = defaults

	static #singleton = new AuthSingleton()
	static get = this.#singleton.get
	static install = this.#singleton.install

	onChange = sub<[Login | null]>()
	wait: Promise<Login | null> = Promise.resolve(null)

	#options: AuthOptions
	#stores: AuthStores
	#login = signal<Login | null>(null)
	#ready: Promise<void>
	#lastLogin: Login | null = null

	constructor(options: Partial<AuthOptions> = {}) {
		this.#options = Auth.defaults(options)
		this.#stores = new AuthStores(this.#options.kv)
		this.#ready = this.#stores.versionMigration(Auth.version)
		this.#login.on(async login => {
			const isChanged = login?.sessionId !== this.#lastLogin?.sessionId
			this.#lastLogin = login
			if (isChanged)
				await this.onChange.pub(login)
		})
	}

	get src() {
		return this.#options.src
	}

	set src(url: string) {
		this.#options.src = url
	}

	async loadLogin(): Promise<Login | null> {
		this.wait = this.#getStoredLogin()
		this.#login.value = await this.wait
		return this.#login.value
	}

	async saveLogin(login: Login | null) {
		this.wait = this.#setStoredLogin(login)
		this.#login.value = await this.wait
		return this.#login.value
	}

	get login() {
		const login = this.#login.value
		if (login && login.isExpired())
			this.#login.value = null
		return this.#login.value
	}

	async popup(url = this.src) {
		const popupWindow = openPopup(url)
		const popupOrigin = new URL(url, window.location.href).origin

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

	async #verify(session: Session) {
		return nullcatch(async() => Login.verify(session, {
			allowedAudiences: [window.origin],
			allowedIssuers: [new URL(this.src).origin],
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

