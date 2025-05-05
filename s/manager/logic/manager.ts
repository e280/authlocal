
import {Kv, StorageDriver} from "@e280/kv"
import {opSignal, signal} from "@benev/slate"

import {Purpose} from "./purpose.js"
import {Depot} from "./depot/depot.js"
import {Situation} from "./situation.js"
import {setupInPopup} from "../fed-api/setup-in-popup.js"
import {StoragePersistence} from "./storage-persistence.js"

export class Manager {
	storagePersistence = new StoragePersistence()
	purpose = signal<Purpose.Any>({kind: "manage"})
	situationOp = opSignal<Situation.Any>()

	depot = new Depot(
		new Kv(new StorageDriver(window.localStorage))
	)

	constructor() {
		const {purpose} = this
		const isPopup = window.opener && window.opener !== window
		const isDebugLoginMode = location.search.includes("login")

		if (isPopup) {
			const popupWindow = window
			const appWindow = window.opener
			const {app} = setupInPopup(
				popupWindow,
				appWindow,
				appWindow.origin,
				loginPurpose => {
					purpose.value = loginPurpose
				},
			)
			app.v3.ready()
		}
		else if (isDebugLoginMode) {
			const audience = window.origin
			const {hostname} = new URL(audience)
			purpose.value = {
				kind: "login",
				audience,
				hostname,
				onDeny: async() => console.log("DENIED LOGIN"),
				onPassport: async passport => console.log("LOGIN", passport.id),
			}
		}
	}
}

