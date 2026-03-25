
import {dom, light, useOnce, useSignal} from "@e280/sly"
import {Bank} from "./bank.js"
import {ListPage} from "./pages/list/view.js"
import {deriveId, sigil} from "../core/index.js"
import {CreatePage} from "./pages/create/view.js"

dom.render(dom("main"), light(() => {
	const bank = useOnce(() => new Bank())

	const $route = useSignal<"list" | "create">(
		bank.$identities().length
			? "list"
			: "create"
	)

	if ($route() === "create")
		return CreatePage({
			done: async draft => {
				const root = draft.$root()
				const name = draft.$name() ?? sigil(deriveId(root))
				await bank.addIdentity({root, name})
				$route("list")
			},
			back: bank.$identities().length
				? () => $route("list")
				: undefined,
		})

	else
		return ListPage({
			bank,
			create: () => $route("create"),
		})
})())

