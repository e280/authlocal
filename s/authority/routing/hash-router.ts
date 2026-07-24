
import {watchHash} from "@e280/sly"
import {derived} from "@e280/strata"
import {makeGo} from "./go.js"
import {routes} from "./routes.js"
import {Context} from "../context.js"

export function makeHashRouter(context: Context) {
	const $hash = watchHash()
	const go = makeGo(context)
	const render = routes(context, go)

	const $page = derived(() => {
		return render($hash())
	})

	function startAtHome() {
		const noIdentities = context.bank.identities.length === 0
		if ($hash() === "" && noIdentities)
			go.home()
	}

	return {go, $page, startAtHome}
}

