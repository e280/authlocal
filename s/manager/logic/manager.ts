
import {Kv, StorageDriver} from "@e280/kv"
import {opSignal, signal} from "@benev/slate"

import {Purpose} from "./purpose.js"
import {Depot} from "./depot/depot.js"
import {Situation} from "./situation.js"
import {Future} from "../../tools/future.js"
import {generateSession} from "../../core/session.js"
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
			)
			const audience = window.opener.origin
			const {hostname} = new URL(audience)
			purpose.value = {
				kind: "login",
				audience,
				hostname,
				onDeny: async() => app.v3.login(null),
				onPassport: async passport => {
					const session = await generateSession(passport, {
						expiresAt: Future.days(7),
						issuer: popupWindow.origin,
						audience,
					})
					await app.v3.login(session)
				},
			}
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

