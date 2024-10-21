
import {Login} from "./types.js"
import {pubsub} from "@benev/slate"
import {openPopup} from "../utils/open-popup.js"

export class Auth {
	static authduoUrl = "https://authduo.org/"

	login: Login | null = null
	onChange = pubsub<[Login]>()

	popup(url: string = Auth.authduoUrl) {
		const popup = openPopup(url)

		if (!popup)
			return null

		popup.onmessage = event => {
			console.log("message", event.data)
		}

		return popup
	}
}

