
import {pubsub, signal} from "@benev/slate"

import {AuthFile} from "./types.js"
import {Proof} from "../auth/tokens/proof.js"
import {Login} from "../auth/tokens/login.js"
import {openPopup} from "./utils/open-popup.js"
import {nullcatch} from "../auth/utils/nullcatch.js"
import {JsonStorage} from "../tools/json-storage.js"
import {LoginSessionTokens} from "../auth/tokens/types.js"
import {setupInApp} from "../manager/fed-api/setup-in-app.js"

export class Auth {
	static url = "https://authduo.org/"
	static version = 0

	#fileStorage = new JsonStorage<AuthFile>("authduo")
	#login = signal<Login | null>(null)
	onChange = pubsub<[Login | null]>()

	constructor() {
		this.load()
		this.#fileStorage.onChangeFromOutside(() => this.load())
	}

	get authfile(): AuthFile {
		const authfile = this.#fileStorage.get()
		return (authfile && "version" in authfile && authfile.version === Auth.version)
			? authfile
			: {version: Auth.version, tokens: null}
	}

	async load() {
		const {tokens} = this.authfile
		this.#login.value = tokens && await nullcatch(async() => {
			const proof = await Proof.verify(
				tokens.proofToken,
				{allowedAudiences: [window.origin]},
			)
			return await Login.verify(proof, tokens.loginToken)
		})
	}

	save(tokens: LoginSessionTokens | null) {
		const {authfile} = this
		authfile.tokens = tokens
		this.#fileStorage.set(authfile)
	}

	get login() {
		const login = this.#login.value
		const valid = login && (Date.now() < login.expiry)
		if (!valid && login)
			this.#login.value = null
		return this.#login.value
	}

	set login(login: Login | null) {
		this.#login.value = login
		this.save(login && {
			loginToken: login.token,
			proofToken: login.proof.token,
		})
	}

	async popup(url: string = Auth.url) {
		const appWindow = window
		const popupWindow = openPopup(url)

		if (!popupWindow)
			return null

		const appOrigin = appWindow.origin
		const popupOrigin = new URL(url, window.location.href).origin

		return new Promise<Login | null>((resolve, reject) => {
			const {dispose} = setupInApp(
				appWindow,
				popupWindow,
				popupOrigin,
				async({proofToken, loginToken}) => {
					popupWindow.close()
					try {
						this.login = await nullcatch(async() => {
							const proof = await Proof.verify(proofToken, {
								allowedIssuers: [popupOrigin],
								allowedAudiences: [appOrigin],
							})
							return await Login.verify(proof, loginToken)
						})
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

