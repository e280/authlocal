
import {sub} from "@e280/stz"
import {ev} from "@benev/slate"
import {Kv, StorageDriver} from "@e280/kv"

import {AuthOptions} from "../types.js"

export function defaults(options: Partial<AuthOptions> = {}): AuthOptions {
	return {
		kv: options.kv ?? new Kv(new StorageDriver()).namespace("authlocal"),
		src: options.src ?? "https://authlocal.org/",
		onStorageChange: options.onStorageChange ?? (() => {
			const subby = sub()
			ev(window, {storage: () => subby.pub()})
			return subby
		})(),
	}
}

