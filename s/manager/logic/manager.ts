
import {Kv, StorageCore} from "@e280/kv"
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
		new Kv(new StorageCore(window.localStorage))
	)

	constructor() {
		const {purpose} = this

		const isPopup = window.opener
		const isDebugLoginMode = location.search.includes("login")

		if (isPopup || isDebugLoginMode) {
			if (isPopup) {
				const appFns = setupInPopup(
					window.opener.origin,
					window.opener,
					p => { purpose.value = p },
				)
				appFns.v2.ready()
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
}

