
import {ev, sub} from "@e280/stz"
import {Kv, StorageDriver} from "@e280/kv"

import {AuthOptions, AuthRequirements} from "../types.js"

export function defaults(options: AuthOptions): AuthRequirements {
	return {
		theme: options.theme,
		kv: options.kv ?? new Kv(new StorageDriver()).scope("authlocal"),
		src: options.src ?? "https://authlocal.org/",
		onStorageChange: options.onStorageChange ?? (() => {
			const subby = sub()
			ev(window as Window, {storage: () => subby.pub()})
			return subby
		})(),
	}
}

