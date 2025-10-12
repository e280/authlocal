
import {Op} from "@e280/sly"
import {ev, time} from "@e280/stz"
import {signal} from "@e280/strata"
import {Kv, StorageDriver} from "@e280/kv"

import {Purpose} from "./purpose.js"
import {Depot} from "./depot/depot.js"
import {Situation} from "./situation.js"
import {StoragePersistence} from "./storage-persistence.js"
import {generateSession} from "../../core/session/session.js"
import {deriveSharedSecret} from "../../core/crypto/crypto.js"
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
			const {app, sayHelloAndGetMandateAndAppOrigin} = setupInPopup(
				popupWindow,
				appWindow,
			)
			sayHelloAndGetMandateAndAppOrigin().then(async({appOrigin, mandate}) => {
				if (mandate.flow === "login") {
					purpose.value = {
						kind: "login",
						appOrigin,
						onDeny: async() => app.v1.deliver(null),
						onIdentity: async identity => {
							const session = await generateSession({
								identity,
								appOrigin,
								expiresAt: time.future.days(7),
								authorityOrigin: popupWindow.origin,
								context: mandate.context,
							})
							await app.v1.deliver({flow: "login", session})
						},
					}
				}
				else if (mandate.flow === "comms") {
					const allIdentities = await this.depot.identities.list()
					const aliceIdentity = allIdentities.find(identity => identity.id === mandate.aliceId)
					purpose.value = {
						kind: "comms",
						appOrigin,
						aliceId: aliceIdentity?.id ?? null,
						bobId: mandate.bobId,
						onDeny: async() => app.v1.deliver(null),
						onAccept: async() => {
							if (!aliceIdentity) {
								await app.v1.deliver(null)
								return
							}
							const secret = await deriveSharedSecret(
								aliceIdentity.secret,
								mandate.bobId,
								`${appOrigin}:${mandate.salt}`,
							)
							await app.v1.deliver({flow: "comms", secret})
						},
					}
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

