
import {hashSignal} from "@e280/sly"
import {derived, signal} from "@e280/strata"
import {makeGo} from "./go.js"
import {Bank} from "../sys/bank.js"
import {routes} from "./routes.js"

export function makeHashRouter(bank: Bank) {
	const $hash = hashSignal()
	const go = makeGo(bank)
	const $route = signal("")
	const render = routes(bank, go, $route)
	const $content = derived(() => render($hash()))

	function startAtHome() {
		const noIdentities = bank.identities.length === 0
		if ($route() === "list" && noIdentities)
			go.home()
	}

	return {go, $route, $content, startAtHome}
}

