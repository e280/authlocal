
import {Op} from "@e280/sly"
import {ev, Time} from "@e280/stz"
import {signal} from "@e280/strata"
import {Kv, StorageDriver} from "@e280/kv"

import {Purpose} from "./purpose.js"
import {Depot} from "./depot/depot.js"
import {Situation} from "./situation.js"
import {StoragePersistence} from "./storage-persistence.js"
import {generateSession} from "../../core/session/session.js"
import {setupInPopup} from "../../app/postmessage/setup-in-popup.js"

export class Manager {
	storagePersistence = new StoragePersistence()
	purpose = signal<Purpose.Any>({kind: "manage"})
	situationOp = Op.loading<Situation.Any>()

	depot = new Depot(
		new Kv(new StorageDriver(window.localStorage))
	)

	dispose = ev(window as any, {storage: async() => {
		await this.depot.identities.list()
	}})

	constructor() {
		const {purpose} = this
		const isPopup = window.opener && window.opener !== window
		const isDebugLoginMode = location.search.includes("login")

		if (isPopup) {
			const popupWindow = window
			const appWindow = window.opener
			const {app, helloAndGetAppOrigin} = setupInPopup(
				popupWindow,
				appWindow,
			)
			helloAndGetAppOrigin().then(appOrigin => {
				purpose.value = {
					kind: "login",
					appOrigin,
					onDeny: async() => app.v1.login(null),
					onIdentity: async identity => {
						const session = await generateSession({
							identity,
							appOrigin,
							expiresAt: Time.future.days(7),
							authorityOrigin: popupWindow.origin,
						})
						await app.v1.login(session)
					},
				}
			}).catch(err => {
				// TODO we should go to a user-facing error route
				console.error(err)
			})
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

