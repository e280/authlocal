
import {dom, light, useSignal} from "@e280/sly"
import {Bank} from "./sys/bank.js"
import {ListPage} from "./pages/list/view.js"
import {deriveId, nomen} from "../core/index.js"
import {CreatePage} from "./pages/create/view.js"
import {RecoveryPage} from "./pages/recovery/view.js"

const bank = await Bank.init()

dom.render(dom("main"), light(() => {
	type Route = "list" | "create" | "recovery"

	function home(): Route {
		return bank.$identities().length
			? "list"
			: "create"
	}

	const $route = useSignal<Route>(home())

	switch ($route()) {
		case "list":
			return ListPage({
				bank,
				create: () => $route("create"),
				recovery: () => $route("recovery"),
			})

		case "create":
			return CreatePage({
				done: async draft => {
					const root = draft.$root()
					const name = draft.$name() ?? nomen.from(deriveId(root))
					await bank.addIdentity({root, name})
					$route("list")
				},
				recovery: () => {
					$route("recovery")
				},
				back: bank.$identities().length
					? () => $route("list")
					: undefined,
			})

		case "recovery":
			return RecoveryPage({
				bank,
				back: () => $route(home()),
				done: async identity => {
					await bank.addIdentity(identity)
					$route("list")
				},
			})

		default:
			throw new Error(`unknown route "${$route()}"`)
	}
})())

