
import {watchHash} from "@e280/sly"
import {derived} from "@e280/strata"
import {makeGo} from "./go.js"
import {routes} from "./routes.js"
import {Bank} from "../sys/bank.js"

export function makeHashRouter(bank: Bank) {
	const $hash = watchHash()
	const go = makeGo(bank)
	const render = routes(bank, go)

	const $page = derived(() => {
		return render($hash())
	})

	function startAtHome() {
		const noIdentities = bank.identities.length === 0
		if ($hash() === "" && noIdentities)
			go.home()
	}

	return {go, $page, startAtHome}
}

