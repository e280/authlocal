
import {Content, router} from "@e280/sly"

import {Go} from "./go.js"
import {Context} from "../context.js"
import {ListPage} from "../dom/pages/list/view.js"
import {CreatePage} from "../dom/pages/create/view.js"
import {deriveId} from "../../lib/core/cryp/derive-id.js"
import {RecoveryPage} from "../dom/pages/recovery/view.js"
import {addressMoniker} from "../../lib/core/ergo/address/moniker.js"

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
					login: expedition.chooseIdentity,
				} :
				(window.location.search.startsWith("?login")) ? {
					appOrigin: "https://example.e280.org",
					login: identity => console.log("login chosen", identity.alias),
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
				const alias = draft.$alias() || addressMoniker(deriveId(root))
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

