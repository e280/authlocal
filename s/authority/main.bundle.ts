
import {html} from "lit"
import {dom, hashNav, hashRouteSignal, light, norm, router} from "@e280/sly"
import {Bank} from "./sys/bank.js"
import {ListPage} from "./pages/list/view.js"
import {EditPage} from "./pages/edit/view.js"
import {SeedPage} from "./pages/seed/view.js"
import {DeletePage} from "./pages/delete/view.js"
import {CreatePage} from "./pages/create/view.js"
import {deriveId, Id, nomen} from "../core/index.js"
import {RecoveryPage} from "./pages/recovery/view.js"

const bank = await Bank.init()

const go = hashNav({
	list: () => ``,
	create: () => `create`,
	edit: (id: Id) => `edit/${nomen.from(id)}`,
	seed: (id: Id) => `seed/${nomen.from(id)}`,
	delete: (id: Id) => `delete/${nomen.from(id)}`,
	recovery: () => `recover`,
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

	"recover": () => RecoveryPage({
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
			seed: () => go.seed(id),
			delete: () => go.delete(id),
			changeName: async name => {
				await bank.setIdentity({...identity, name})
				go.home()
			},
		})
	},

	"seed/{n}": params => {
		const idMaybe = nomen.parse(params.n)
		if (!idMaybe.yay) return undefined
		const id = idMaybe.value
		const identity = bank.getIdentity(id)
		if (!identity) return undefined
		return SeedPage({
			identity,
			back: () => go.edit(id),
			edit: () => go.edit(id),
			seed: () => go.seed(id),
			delete: () => go.delete(id),
		})
	},

	"delete/{n}": params => {
		const idMaybe = nomen.parse(params.n)
		if (!idMaybe.yay) return undefined
		const id = idMaybe.value
		const identity = bank.getIdentity(id)
		if (!identity) return undefined
		return DeletePage({
			identity,
			back: () => go.edit(id),
			edit: () => go.edit(id),
			seed: () => go.seed(id),
			deleteTab: () => go.delete(id),
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
