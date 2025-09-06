
import {ev, sub} from "@e280/stz"
import {Kv, StorageDriver} from "@e280/kv"

import {AuthOptions} from "../types.js"

export function defaults(options: Partial<AuthOptions> = {}): AuthOptions {
	return {
		kv: options.kv ?? new Kv(new StorageDriver()).scope("authlocal"),
		src: options.src ?? "https://authlocal.org/",
		onStorageChange: options.onStorageChange ?? (() => {
			const subby = sub()
			ev(window as Window, {storage: () => subby.pub()})
			return subby
		})(),
	}
}

