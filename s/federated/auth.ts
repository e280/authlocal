
import {pubsub, signal} from "@benev/slate"

import {AuthFile} from "./types.js"
import {openPopup} from "./utils/open-popup.js"
import {nullcatch} from "../auth/utils/nullcatch.js"
import {JsonStorage} from "../tools/json-storage.js"
import {LoginProof} from "../auth/tokens/login-proof.js"
import {LoginSessionTokens} from "../auth/tokens/types.js"
import {LoginKeypair} from "../auth/tokens/login-keypair.js"
import {setupInApp} from "../manager/fed-api/setup-in-app.js"

export class Auth {
	static url = "https://authduo.org/"
	static version = 0

	#fileStorage = new JsonStorage<AuthFile>("authduo")
	#login = signal<LoginKeypair | null>(null)
	onChange = pubsub<[LoginKeypair | null]>()

	constructor() {
		this.load()
		this.#fileStorage.onChangeFromOutside(() => this.load())
		this.#login.on(login => this.onChange.publish(login))
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
			const proof = await LoginProof.verify(
				tokens.proofToken,
				{allowedAudiences: [window.origin]},
			)
			return await LoginKeypair.verify(proof, tokens.loginToken)
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

	set login(login: LoginKeypair | null) {
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

		return new Promise<LoginKeypair | null>((resolve, reject) => {
			const {dispose} = setupInApp(
				appWindow,
				popupWindow,
				popupOrigin,
				async({proofToken, loginToken}) => {
					popupWindow.close()
					try {
						this.login = await nullcatch(async() => {
							const proof = await LoginProof.verify(proofToken, {
								allowedIssuers: [popupOrigin],
								allowedAudiences: [appOrigin],
							})
							return await LoginKeypair.verify(proof, loginToken)
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

