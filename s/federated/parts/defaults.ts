
import {Kv, StorageCore} from "@e280/kv"
import {AuthOptions} from "../auth.js"

export function defaults(options: Partial<AuthOptions> = {}) {
	return {
		kv: new Kv(new StorageCore()).namespace("authlocal"),
		src: "https://authlocal.org/",
		...options,
	}
}

