
import {dom, light, useOnce, useSignal} from "@e280/sly"
import {Bank} from "./bank.js"
import {ListPage} from "./pages/list/view.js"
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
				await bank.addIdentity({name: draft.$name(), root: draft.$root()})
				$route("list")
			},
			back: () => $route("list"),
		})

	else
		return ListPage({
			bank,
			create: () => $route("create"),
		})
})())

