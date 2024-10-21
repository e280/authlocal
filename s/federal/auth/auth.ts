
import {Login} from "./types.js"
import {pubsub} from "@benev/slate"
import {openPopup} from "../utils/open-popup.js"

export class Auth {
	static url = "https://authduo.org/"

	login: Login | null = null
	onChange = pubsub<[Login]>()

	async obtainLogin(url: string = Auth.url) {
		const {login} = this
		const valid = login && (Date.now() < login.expiry)
		return valid
			? login
			: this.popup(url)
	}

	async popup(url: string = Auth.url) {
		const popup = openPopup(url)

		if (!popup)
			return null

		popup.onmessage = event => {
			console.log("message", event.data)
		}

		return popup
	}
}

