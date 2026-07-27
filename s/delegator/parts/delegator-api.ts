
import {defer} from "@e280/stz"
import {Identity} from "../types.js"
import {Context} from "../context.js"
import {DelegatorApi, deriveId, signDelegate} from "../../lib/index.js"

export const delegateApi = (context: Context, delegatorOrigin: string) => (
	(appOrigin: string) => (<DelegatorApi>{v1: {
		async requestDelegates(petitions) {
			const chooseIdentity = defer<Identity>()

			context.$expedition({
				appOrigin,
				petitions,
				chooseIdentity: chooseIdentity.resolve,
			})

			const identity = await chooseIdentity.promise
			const atTime = Date.now()

			const delegates = petitions.map(petition =>
				signDelegate(identity.root, {
					alias: identity.alias,
					petition,
					delegatorOrigin,
					appOrigin,
					atTime,
				})
			)

			await context.bank.recordDelegationEvent({
				id: deriveId(identity.root),
				alias: identity.alias,
				app: appOrigin,
				time: atTime,
				delegates,
			})

			return delegates
		},
	}})
)

