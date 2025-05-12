
import {Kv, StorageDriver} from "@e280/kv"
import {ev, opSignal, signal} from "@benev/slate"

import {Purpose} from "./purpose.js"
import {Depot} from "./depot/depot.js"
import {Time} from "../../tools/time.js"
import {Situation} from "./situation.js"
import {generateSession} from "../../core/session.js"
import {StoragePersistence} from "./storage-persistence.js"
import {setupInPopup} from "../../federated/api/setup-in-popup.js"

export class Manager {
	storagePersistence = new StoragePersistence()
	purpose = signal<Purpose.Any>({kind: "manage"})
	situationOp = opSignal<Situation.Any>()

	depot = new Depot(
		new Kv(new StorageDriver(window.localStorage))
	)

	dispose = ev(window, {storage: async() => {
		await this.depot.identities.list()
	}})

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
			const appOrigin = window.opener.origin
			purpose.value = {
				kind: "login",
				appOrigin,
				onDeny: async() => app.v1.login(null),
				onIdentity: async identity => {
					const session = await generateSession({
						identity,
						appOrigin,
						expiresAt: Time.future.days(7),
						providerOrigin: popupWindow.origin,
					})
					await app.v1.login(session)
				},
			}
		}

		else if (isDebugLoginMode) {
			const appOrigin = window.origin
			purpose.value = {
				kind: "login",
				appOrigin,
				onDeny: async() => console.log("DENIED LOGIN"),
				onIdentity: async identity => console.log("LOGIN", identity.id),
			}
		}
	}
}

