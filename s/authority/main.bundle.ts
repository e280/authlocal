
import {dom, light, useSignal} from "@e280/sly"
import {Bank} from "./sys/bank.js"
import {ListPage} from "./pages/list/view.js"
import {deriveId, nom} from "../core/index.js"
import {CreatePage} from "./pages/create/view.js"

const bank = await Bank.init()

dom.render(dom("main"), light(() => {
	const $route = useSignal<"list" | "create">(
		bank.$identities().length
			? "list"
			: "create"
	)

	if ($route() === "create") return CreatePage({
		done: async draft => {
			const root = draft.$root()
			const name = draft.$name() ?? nom(deriveId(root))
			await bank.addIdentity({root, name})
			$route("list")
		},
		back: bank.$identities().length
			? () => $route("list")
			: undefined,
	})

	else return ListPage({
		bank,
		create: () => $route("create"),
	})
})())

