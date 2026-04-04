
import {cleanHash, norm} from "@e280/sly"
import {signal} from "@e280/strata"

export function hashSignal() {
	function get() {
		cleanHash()
		return norm(location.hash)
	}
	const $hash = signal<string>(get())
	addEventListener("hashchange", () => $hash(get()))
	return $hash
}

