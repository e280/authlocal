
import {Kv, StorageDriver} from "@e280/kv"
import {AuthOptions} from "../types.js"

export function defaults(options: Partial<AuthOptions> = {}): AuthOptions {
	return {
		kv: new Kv(new StorageDriver()).namespace("authlocal"),
		src: "https://authlocal.org/",
		...options,
	}
}

