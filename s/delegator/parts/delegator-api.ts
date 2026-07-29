
import {defer} from "@e280/stz"
import {Identity} from "../types.js"
import {Context} from "../context.js"
import {Proof} from "../../lib/core/alco/proof/types.js"
import {decodeToken, DelegatorApi, deriveId, Payload, signDelegate} from "../../lib/index.js"

export const delegatorApi = (context: Context, delegatorOrigin: string) => (
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
					issuer: delegatorOrigin,
					audience: appOrigin,
					atTime,
				})
			)

			await context.bank.recordDelegationEvent({
				id: deriveId(identity.root),
				alias: identity.alias,
				app: appOrigin,
				time: atTime,
				proofPayloads: delegates.map(
					d => decodeToken<Payload<{proof: Proof}>>(d.proofToken).payload
				),
			})

			return delegates
		},
	}})
)

