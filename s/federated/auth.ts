
import {pubsub} from "@benev/slate"

import {Login} from "../auth/tokens/login.js"
import {openPopup} from "./utils/open-popup.js"
import {nullcatch} from "../auth/utils/nullcatch.js"
import {storageSignal} from "../tools/json-storage.js"
import {setupInApp} from "../manager/fed-api/setup-in-app.js"

export class Auth {
	static url = "https://authduo.org/"

	#login = storageSignal<Login | null>("authduo_login")
	onChange = pubsub<[Login | null]>()

	get login() {
		const login = this.#login.signal.value
		const valid = login && (Date.now() < login.expiry)
		if (!valid && login)
			this.#login.signal.value = null
		return this.#login.signal.value
	}

	set login(login: Login | null) {
		this.#login.save(login)
	}

	constructor() {
		this.#login.signal.on(login => this.onChange.publish(login))
	}

	async popup(url: string = Auth.url) {
		const appWindow = window
		const popupWindow = openPopup(url)

		if (!popupWindow)
			return null

		const popupOrigin = new URL(url, window.location.href).origin

		return new Promise<Login | null>((resolve, reject) => {
			const {dispose} = setupInApp(
				appWindow,
				popupWindow,
				popupOrigin,
				async token => {
					popupWindow.close()
					try {
						this.login = await nullcatch(() => Login.verify(token, {
							allowedIssuers: [popupOrigin],
							allowedAudiences: [appWindow.origin],
						}))
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

