
import {ev, pubsub} from "@benev/slate"

import {Login} from "./types.js"
import {openPopup} from "../utils/open-popup.js"
import {verify} from "../../common/auth/verify.js"
import {storageSignal} from "../../tools/json-storage.js"

export class Auth {
	static url = "https://authduo.org/"

	#login = storageSignal<Login | null>("authduo_login")
	onChange = pubsub<[Login | null]>()

	get login() {
		const login = this.#login.signal.value
		const valid = login && (Date.now() < login.expiry)
		if (!valid)
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
		const popup = openPopup(url)

		if (!popup)
			return null

		const expectedOrigin = new URL(url, window.location.href).origin

		return new Promise<Login | null>(resolve => {
			ev(window, {
				message: async(event: MessageEvent) => {
					if (event.origin === expectedOrigin && "token" in event.data && typeof event.data.token === "string") {
						const token = event.data.token as string
						const access = await verify(event.data.token)
						this.login = {...access, token}
						popup.close()
						resolve(this.login)
					}
				},
			})
			popup.onclose = () => {
				resolve(this.login)
			}
		})
	}
}

