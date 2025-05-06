
import {Pipe, sub} from "@e280/stz"
import {apply, ev, signal} from "@benev/slate"

import {Login} from "../core/login.js"
import {AuthOptions} from "./types.js"
import {themes} from "./themes/themes.js"
import {Session} from "../core/session.js"
import {defaults} from "./parts/defaults.js"
import {AuthStores} from "./parts/stores.js"
import {openPopup} from "./parts/open-popup.js"
import {setupInApp} from "./api/setup-in-app.js"
import {components} from "./views/components.js"
import {AuthSingleton} from "./parts/singleton.js"
import {detectTheme} from "./parts/detect-theme.js"
import {nullcatch} from "../common/utils/nullcatch.js"

export class Auth {
	static version = 1
	static defaults = defaults

	static #singleton = new AuthSingleton()
	static get = this.#singleton.get
	static install = this.#singleton.install

	static themes = themes
	static components(theme = detectTheme()) {
		return Pipe.with(components)
			.to(apply.css(theme))
			.to(apply.reactive())
			.done()
	}

	src: string
	on = sub<[Login | null]>()
	loginSignal = signal<Login | null>(null)
	wait: Promise<Login | null> = Promise.resolve(null)
	dispose: () => void

	#options: AuthOptions
	#stores: AuthStores
	#ready: Promise<void>

	constructor(options: Partial<AuthOptions> = {}) {
		this.#options = Auth.defaults(options)
		this.src = this.#options.src
		this.#stores = new AuthStores(this.#options.kv)
		this.#ready = this.#stores.versionMigration(Auth.version)
		this.dispose = (() => {
			const detachOn = this.loginSignal.on(login => this.on.pub(login))
			const detachStorage = ev(window, {storage: () => this.loadLogin()})
			return () => {
				detachOn()
				detachStorage()
			}
		})()
	}

	async loadLogin(): Promise<Login | null> {
		this.wait = this.#getStoredLogin()
		return this.#updateLoginSignal(await this.wait)
	}

	async saveLogin(login: Login | null) {
		this.wait = this.#setStoredLogin(login)
		return this.#updateLoginSignal(await this.wait)
	}

	async logout() {
		return this.saveLogin(null)
	}

	get login() {
		const login = this.loginSignal.value
		if (login && login.isExpired())
			this.loginSignal.value = null
		return this.loginSignal.value
	}

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
		const hasChanged = login?.sessionId !== this.loginSignal.value?.sessionId
		if (hasChanged)
			this.loginSignal.value = login
		return login
	}

	async #verify(session: Session) {
		return nullcatch(async() => Login.verify(session, {
			allowedAudiences: [window.origin],
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

