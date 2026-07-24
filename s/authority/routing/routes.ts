
import {Content, router} from "@e280/sly"

import {Go} from "./go.js"
import {Context} from "../context.js"
import {ListPage} from "../pages/list/view.js"
import {CreatePage} from "../pages/create/view.js"
import {address, deriveId} from "../../lib/index.js"
import {RecoveryPage} from "../pages/recovery/view.js"

export type Page = {
	zone: string
	subtitle: string
	content: Content
}

export const routes = (context: Context, go: Go) => router({
	"": () => {
		const expedition = context.$expedition()
		return ListPage({
			loginRequest: (
				(expedition) ? {
					appOrigin: expedition.appOrigin,
					login: identity => context.chooseIdentity.publish(identity),
				} :
				(window.location.search.startsWith("?login")) ? {
					appOrigin: "https://example.e280.org",
					login: identity => console.log("LOGIN WITH", identity.alias),
				} :
				undefined
			),
			identities: context.bank.identities,
			goCreate: go.create,
			goRecovery: go.recovery,
			updateIdentity: identity => context.bank.setIdentity(identity),
			deleteIdentity: identity => context.bank.deleteIdentity(deriveId(identity.root)),
		})
	},

	"create": () => {
		return CreatePage({
			done: async draft => {
				const root = draft.$root()
				const alias = draft.$alias() || address.moniker(deriveId(root))
				await context.bank.setIdentity({root, alias})
				go.list()
			},
			recovery: go.recovery,
			back: context.bank.identities.length
				? go.list
				: undefined,
		})
	},

	"recovery": () => {
		return RecoveryPage({
			back: go.home,
			done: async identity => {
				await context.bank.setIdentity(identity)
				go.list()
			},
		})
	},
})

