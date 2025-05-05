
import {sub} from "@e280/stz"
import {signal} from "@benev/slate"

import {Login} from "../core/login.js"
import {AuthOptions} from "./types.js"
import {defaults} from "./parts/defaults.js"
import {AuthStores} from "./parts/stores.js"
import {AuthSingleton} from "./parts/singleton.js"
import {nullcatch} from "../common/utils/nullcatch.js"

export class Auth {
	static version = 2
	static defaults = defaults

	static #singleton = new AuthSingleton()
	static get = this.#singleton.get
	static install = this.#singleton.install

	onChange = sub<[Login | null]>()
	wait: Promise<Login | null> = Promise.resolve(null)

	#options: AuthOptions
	#stores: AuthStores
	#login = signal<Login | null>(null)

	constructor(options: Partial<AuthOptions> = {}) {
		this.#options = Auth.defaults(options)
		this.#stores = new AuthStores(this.#options.kv)
	}

	async recallLogin(): Promise<Login | null> {
		await this.#stores.versionMigration()
		const session = await this.#stores.session.get()
		this.wait = (async() => {
			if (!session)
				return null
			if (this.#login.value && this.#login.value.session.secret === session.secret)
				return Promise.resolve(this.#login.value)
			return nullcatch(async() => Login.verify(session, {
				allowedAudiences: [window.origin],
				allowedIssuers: [new URL(this.#options.src).origin],
			}))
		})()
		const login = await this.wait
		if (this.#login.value !== login)
			this.#login.value = login
		return login
	}

	async saveLogin(login: Login | null) {
		const session = login?.session
		await this.#stores.session.set(session)
	}

	get login() {
		const login = this.#login.value
		if (login && login.isExpired())
			this.#login.value = null
		return this.#login.value
	}

	set login(login: Login | null) {
		this.#login.value = login
		this.#save(login && login.tokens)
		this.wait = Promise.resolve(login)
	}
}

