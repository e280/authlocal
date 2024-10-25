
import {Signal, signal} from "@benev/slate"

import {Purpose} from "./purpose.js"
import {setupInPopup} from "../fed-api/setup-in-popup.js"

export function determinePurpose(): Signal<Purpose.Any> {
	const purpose = signal<Purpose.Any>({kind: "manage"})
	const loginRequested = location.search.includes("login") || window.opener

	if (loginRequested) {
		purpose.value = {
			kind: "login",
			onLogin: async passport => console.log("LOGIN", passport.thumbprint),
		}
		const {appFns} = setupInPopup(
			window.opener,
			window,
			purpose,
		)
		appFns.ready()
		return purpose
	}
	else {
		return purpose
	}
}

