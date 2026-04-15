
import {Signal} from "@e280/strata"
import {Content, router} from "@e280/sly"

import {Go} from "./go.js"
import {Bank} from "../sys/bank.js"
import {ListPage} from "../pages/list/view.js"
import {EditPage} from "../pages/edit/view.js"
import {SeedPage} from "../pages/seed/view.js"
import {DeletePage} from "../pages/delete/view.js"
import {CreatePage} from "../pages/create/view.js"
import {address, deriveId} from "../../lib/index.js"
import {RecoveryPage} from "../pages/recovery/view.js"

export type Page = {
	zone: string
	subtitle: string
	content: Content
}

export const routes = (bank: Bank, go: Go, $zone: Signal<string>) => router({
	"": () => {
		$zone("list")
		return ListPage({
			identities: bank.identities,
			create: go.create,
			recovery: go.recovery,
			edit: go.edit,
		})
	},

	"create": () => {
		$zone("create")
		return CreatePage({
			done: async draft => {
				const root = draft.$root()
				const alias = draft.$alias() || address.short(deriveId(root))
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
		$zone("recovery")
		return RecoveryPage({
			back: go.home,
			done: async identity => {
				await bank.setIdentity(identity)
				go.list()
			},
		})
	},

	"edit/{n}": params => {
		$zone("edit")
		const idMaybe = address.parse(params.n)
		if (!idMaybe.yay) return undefined
		const id = idMaybe.value
		const identity = bank.getIdentity(id)
		if (!identity) return undefined
		return EditPage({
			identity,
			back: go.home,
			seed: () => go.seed(id),
			delete: () => go.delete(id),
			changeAlias: async alias => {
				await bank.setIdentity({...identity, alias})
				go.home()
			},
		})
	},

	"seed/{n}": params => {
		$zone("seed")
		const idMaybe = address.parse(params.n)
		if (!idMaybe.yay) return undefined
		const id = idMaybe.value
		const identity = bank.getIdentity(id)
		if (!identity) return undefined
		return SeedPage({
			identity,
			back: go.list,
			edit: () => go.edit(id),
			seed: () => go.seed(id),
			delete: () => go.delete(id),
		})
	},

	"delete/{n}": params => {
		$zone("delete")
		const idMaybe = address.parse(params.n)
		if (!idMaybe.yay) return undefined
		const id = idMaybe.value
		const identity = bank.getIdentity(id)
		if (!identity) return undefined
		return DeletePage({
			identity,
			back: go.list,
			edit: () => go.edit(id),
			seed: () => go.seed(id),
			deleteTab: () => go.delete(id),
			delete: async() => {
				await bank.deleteIdentity(id)
				go.home()
			},
		})
	},
})

