
import {hashSignal} from "@e280/sly"
import {derived, signal} from "@e280/strata"
import {makeGo} from "./go.js"
import {Bank} from "../sys/bank.js"
import {routes} from "./routes.js"

export function makeHashRouter(bank: Bank) {
	const $hash = hashSignal()
	const go = makeGo(bank)
	const $zone = signal("")
	const render = routes(bank, go, $zone)
	const $content = derived(() => render($hash()))

	function startAtHome() {
		const noIdentities = bank.identities.length === 0
		if ($zone() === "list" && noIdentities)
			go.home()
	}

	return {go, $zone, $content, startAtHome}
}

