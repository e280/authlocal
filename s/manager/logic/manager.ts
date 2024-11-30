
import {opSignal, signal} from "@benev/slate"

import {Purpose} from "./purpose.js"
import {Situation} from "./situation.js"
import {PassportStore} from "./passport-store.js"
import {setupInPopup} from "../fed-api/setup-in-popup.js"
import {StoragePersistence} from "./storage-persistence.js"

export class Manager {
	passportStore = new PassportStore()
	storagePersistence = new StoragePersistence()
	purpose = signal<Purpose.Any>({kind: "manage"})
	situationOp = opSignal<Situation.Any>()

	constructor() {
		const {purpose} = this

		const isPopup = window.opener
		const isDebugLoginMode = location.search.includes("login")

		if (isPopup || isDebugLoginMode) {
			if (isPopup) {
				const {appFns} = setupInPopup(
					window.opener,
					window,
					p => { purpose.value = p },
				)

				appFns.v1.ready()
			}
			else if (isDebugLoginMode) {
				const audience = window.origin
				const {hostname} = new URL(audience)
				purpose.value = {
					kind: "login",
					audience,
					hostname,
					onLogin: async passport => console.log("LOGIN", passport.thumbprint),
				}
			}
		}
	}
}

