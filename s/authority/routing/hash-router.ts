
import {hashSignal} from "@e280/sly"
import {derived, signal} from "@e280/strata"
import {makeGo} from "./go.js"
import {routes} from "./routes.js"
import {Bank} from "../sys/bank.js"

export function makeHashRouter(bank: Bank) {
	const $hash = hashSignal()
	const go = makeGo(bank)
	const $zone = signal("")
	const $subtitle = signal("")
	const render = routes(bank, go, $zone, $subtitle)
	const $page = derived(() => render($hash()))

	function startAtHome() {
		const noIdentities = bank.identities.length === 0
		if ($zone() === "list" && noIdentities)
			go.home()
	}

	return {go, $page, $zone, $subtitle, startAtHome}
}

