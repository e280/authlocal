
import {html} from "lit"
import {dom, hashNav, hashRouteSignal, light, norm, router} from "@e280/sly"
import {Bank} from "./sys/bank.js"
import {ListPage} from "./pages/list/view.js"
import {EditPage} from "./pages/edit/view.js"
import {CreatePage} from "./pages/create/view.js"
import {deriveId, Id, nomen} from "../core/index.js"
import {RecoveryPage} from "./pages/recovery/view.js"
import {EditSeedPage} from "./pages/edit/seed/view.js"
import {EditDeletePage} from "./pages/edit/delete/view.js"

const bank = await Bank.init()

const go = hashNav({
	list: () => ``,
	create: () => `create`,
	edit: (id: Id) => `edit/${nomen.from(id)}`,
	editSeed: (id: Id) => `edit/${nomen.from(id)}/seed`,
	editDelete: (id: Id) => `edit/${nomen.from(id)}/delete`,
	recovery: () => `recovery`,
	home: () => (
		(bank.identities.length)
			? ``
			: `create`
	),
})

const $content = hashRouteSignal(router({
	"": () => ListPage({
		identities: bank.identities,
		create: go.create,
		recovery: go.recovery,
		edit: go.edit,
	}),

	"create": () => CreatePage({
		done: async draft => {
			const root = draft.$root()
			const name = draft.$name() ?? nomen.from(deriveId(root))
			await bank.setIdentity({root, name})
			go.list()
		},
		recovery: go.recovery,
		back: bank.identities.length
			? go.list
			: undefined,
	}),

	"recovery": () => RecoveryPage({
		back: go.home,
		done: async identity => {
			await bank.setIdentity(identity)
			go.list()
		},
	}),

	"edit/{n}": params => {
		const idMaybe = nomen.parse(params.n)
		if (!idMaybe.yay) return undefined
		const id = idMaybe.value
		const identity = bank.getIdentity(id)
		if (!identity) return undefined
		return EditPage({
			identity,
			back: go.home,
			seed: () => go.editSeed(id),
			delete: () => go.editDelete(id),
			changeName: async name => {
				console.log("NAME SAVE", name)
				await bank.setIdentity({...identity, name})
				go.home()
			},
		})
	},

	"edit/{n}/seed": params => {
		const idMaybe = nomen.parse(params.n)
		if (!idMaybe.yay) return undefined
		const id = idMaybe.value
		const identity = bank.getIdentity(id)
		if (!identity) return undefined
		return EditSeedPage({
			identity,
			back: () => go.edit(id),
		})
	},

	"edit/{n}/delete": params => {
		const idMaybe = nomen.parse(params.n)
		if (!idMaybe.yay) return undefined
		const id = idMaybe.value
		const identity = bank.getIdentity(id)
		if (!identity) return undefined
		return EditDeletePage({
			identity,
			back: () => go.edit(id),
			delete: async() => {
				await bank.deleteIdentity(id)
				go.home()
			},
		})
	},
}))

{
	const isHome = norm(location.hash) === ""
	const noIdentities = bank.identities.length === 0
	if (isHome && noIdentities)
		go.home()
}

const App = light(() => $content() ?? html`
	<h2>404 not found.</h2>
	<button data-vibe="naked lame" @click="${go.home}">home</button>
`)

dom.render(dom("main"), App())
