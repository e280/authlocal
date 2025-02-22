
import {pubsub, signal} from "@benev/slate"

import {AuthFile} from "./types.js"
import {Login} from "./utils/login.js"
import {openPopup} from "./utils/open-popup.js"
import {LoginTokens} from "../auth/tokens/types.js"
import {nullcatch} from "../auth/utils/nullcatch.js"
import {JsonStorage} from "../tools/json-storage.js"
import {setupInApp} from "../manager/fed-api/setup-in-app.js"
import {migrateStorageKeyRename} from "../tools/migrate-storage-key-rename.js"

export class Auth {
	static defaultUrl = "https://authlocal.org/"
	static version = 1
	static #auth: Auth | null = null

	static get() {
		if (!this.#auth)
			this.#auth = new this()
		return this.#auth
	}

	onChange = pubsub<[Login | null]>()
	#login = signal<Login | null>(null)
	#fileStorage: JsonStorage<AuthFile>

	wait: Promise<Login | null>

	constructor() {
		migrateStorageKeyRename(window.localStorage, "authduo", "authlocal")
		this.#fileStorage = new JsonStorage<AuthFile>("authlocal")
		this.#fileStorage.onChangeFromOutside(() => {
			this.wait = this.#load()
		})
		this.#login.on(login => this.onChange.publish(login))
		this.wait = this.#load()
	}

	get authfile(): AuthFile {
		const authfile = this.#fileStorage.get()
		return (authfile && "version" in authfile && authfile.version === Auth.version)
			? authfile
			: {version: Auth.version, tokens: null}
	}

	async #load() {
		const {tokens} = this.authfile
		const oldTokens = this.#login.value?.tokens

		if (tokens?.proofToken === oldTokens?.proofToken)
			return this.#login.value

		return this.#login.value = tokens && await nullcatch(
			async() => Login.verify(tokens, {allowedAudiences: [window.origin]})
		)
	}

	#save(tokens: LoginTokens | null) {
		const {authfile} = this
		authfile.tokens = tokens
		this.#fileStorage.set(authfile)
	}

	get login() {
		const login = this.#login.value
		const valid = login && (Date.now() < login.expiresAt)
		if (!valid && login)
			this.#login.value = null
		return this.#login.value
	}

	set login(login: Login | null) {
		this.#login.value = login
		this.#save(login && login.tokens)
		this.wait = Promise.resolve(login)
	}

	async popup(url = Auth.defaultUrl) {
		const appWindow = window
		const popupWindow = openPopup(url)

		if (!popupWindow)
			return null

		const appOrigin = window.origin
		const popupOrigin = new URL(url, window.location.href).origin

		return new Promise<Login | null>((resolve, reject) => {
			const {dispose} = setupInApp(
				appWindow,
				popupWindow,
				popupOrigin,
				async loginTokens => {
					popupWindow.close()
					try {
						this.login = await nullcatch(
							async() => Login.verify(loginTokens, {
								allowedIssuers: [popupOrigin],
								allowedAudiences: [appOrigin],
							})
						)
						dispose()
						resolve(this.login)
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
}

