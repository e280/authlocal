
import {norm} from "@e280/sly"
import {signal} from "@e280/strata"

export function hashSignal() {
	const $hash = signal<string>(norm(location.hash))
	addEventListener("hashchange", () => $hash(norm(location.hash)))
	return $hash
}

