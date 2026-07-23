
import {Content, router} from "@e280/sly"

import {Go} from "./go.js"
import {Bank} from "../sys/bank.js"
import {ListPage} from "../pages/list/view.js"
import {CreatePage} from "../pages/create/view.js"
import {address, deriveId} from "../../lib/index.js"
import {RecoveryPage} from "../pages/recovery/view.js"

export type Page = {
	zone: string
	subtitle: string
	content: Content
}

export const routes = (bank: Bank, go: Go) => router({
	"": () => {
		return ListPage({
			identities: bank.identities,
			goCreate: go.create,
			goRecovery: go.recovery,
			updateIdentity: identity => bank.setIdentity(identity),
			deleteIdentity: identity => bank.deleteIdentity(deriveId(identity.root)),
		})
	},

	"create": () => {
		return CreatePage({
			done: async draft => {
				const root = draft.$root()
				const alias = draft.$alias() || address.moniker(deriveId(root))
				await bank.setIdentity({root, alias})
				go.list()
			},
			recovery: go.recovery,
			back: bank.identities.length
				? go.list
				: undefined,
		})
	},

	"recovery": () => {
		return RecoveryPage({
			back: go.home,
			done: async identity => {
				await bank.setIdentity(identity)
				go.list()
			},
		})
	},
})

