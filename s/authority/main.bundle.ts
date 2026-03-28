
import {html} from "lit"
import {dom, hashNav, hashSignal, light, norm, router} from "@e280/sly"
import {Bank} from "./sys/bank.js"
import {ListPage} from "./pages/list/view.js"
import {deriveId, nomen} from "../core/index.js"
import {CreatePage} from "./pages/create/view.js"
import {RecoveryPage} from "./pages/recovery/view.js"

const bank = await Bank.init()

const go = hashNav({
	list: () => ``,
	create: () => `create`,
	recovery: () => `recovery`,
	home: () => (
		(bank.$identities().length)
			? ``
			: `create`
	),
})

const $content = hashSignal(router({
	"": () => ListPage({
		identities: bank.$identities(),
		create: go.create,
		recovery: go.recovery,
	}),

	"create": () => CreatePage({
		done: async draft => {
			const root = draft.$root()
			const name = draft.$name() ?? nomen.from(deriveId(root))
			await bank.addIdentity({root, name})
			go.list()
		},
		recovery: go.recovery,
		back: bank.$identities().length
			? go.list
			: undefined,
	}),

	"recovery": () => RecoveryPage({
		back: go.home,
		done: async identity => {
			await bank.addIdentity(identity)
			go.list()
		},
	}),
}))

{
	const isHome = norm(location.hash) === ""
	const noIdentities = bank.$identities().length === 0

	if (isHome && noIdentities)
		go.home()
}

const App = light(() => $content() ?? html`<h2>404 not found</h2>`)

dom.render(dom("main"), App())

