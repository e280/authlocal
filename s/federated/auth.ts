
import {Pipe, sub} from "@e280/stz"
import {apply, register, signal} from "@benev/slate"

import underlayCss from "./underlay.css.js"

import {Login} from "../core/login.js"
import {Future} from "../tools/future.js"
import {common} from "../common/common.js"
import {Session} from "../core/session.js"
import {defaults} from "./parts/defaults.js"
import {AuthStores} from "./parts/stores.js"
import {openPopup} from "./parts/open-popup.js"
import {setupInApp} from "./api/setup-in-app.js"
import {AuthSingleton} from "./parts/singleton.js"
import {nullcatch} from "../common/utils/nullcatch.js"
import {federatedElements} from "./elements/elements.js"
import {AuthComponentOptions, AuthInstallOptions, AuthOptions} from "./types.js"

export class Auth {
	static version = 1
	static defaults = defaults

	static Future = Future

	static #singleton = new AuthSingleton()
	static get = this.#singleton.get
	static initialize = this.#singleton.initialize

	static elements({theme = []}: Partial<AuthComponentOptions> = {}) {
		return Pipe.with(federatedElements)
			.to(apply.css([underlayCss, common.theme]))
			.to(apply.reactive())
			.done()
	}

	static async install(options?: Partial<AuthInstallOptions>) {
		const auth = await this.initialize(options)
		register(this.elements(options))
		return auth
	}

	src: string
	on = sub<[Login | null]>()
	wait: Promise<Login | null> = Promise.resolve(null)

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
		const login = this.#login.value
		if (login && login.isExpired())
			this.#login.value = null
		return this.#login.value
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

