
import {pubsub, signal} from "@benev/slate"

import {AuthFile} from "./types.js"
import {openPopup} from "./utils/open-popup.js"
import {LoginTokens} from "../auth/tokens/types.js"
import {nullcatch} from "../auth/utils/nullcatch.js"
import {JsonStorage} from "../tools/json-storage.js"
import {LoginKeys} from "../auth/tokens/login-keys.js"
import {LoginProof} from "../auth/tokens/login-proof.js"
import {setupInApp} from "../manager/fed-api/setup-in-app.js"

export class Auth {
	static url = "https://authduo.org/"
	static version = 1

	#fileStorage = new JsonStorage<AuthFile>("authduo")
	#login = signal<LoginKeys | null>(null)
	onChange = pubsub<[LoginKeys | null]>()

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
				tokens.loginProofToken,
				{allowedAudiences: [window.origin]},
			)
			return await LoginKeys.verify(proof, tokens.loginKeysToken)
		})
	}

	save(tokens: LoginTokens | null) {
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

	set login(login: LoginKeys | null) {
		this.#login.value = login
		this.save(login && {
			loginKeysToken: login.token,
			loginProofToken: login.proof.token,
		})
	}

	async popup(url: string = Auth.url) {
		const appWindow = window
		const popupWindow = openPopup(url)

		if (!popupWindow)
			return null

		const appOrigin = appWindow.origin
		const popupOrigin = new URL(url, window.location.href).origin

		return new Promise<LoginKeys | null>((resolve, reject) => {
			const {dispose} = setupInApp(
				appWindow,
				popupWindow,
				popupOrigin,
				async({loginProofToken: proofToken, loginKeysToken: loginToken}) => {
					popupWindow.close()
					try {
						this.login = await nullcatch(async() => {
							const proof = await LoginProof.verify(proofToken, {
								allowedIssuers: [popupOrigin],
								allowedAudiences: [appOrigin],
							})
							return await LoginKeys.verify(proof, loginToken)
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

