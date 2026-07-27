
import {Kv, StorageMagazine} from "@e280/kv"
import {AuthOptions, Session} from "../types.js"

export function defaultifyAuthOptions(options: Partial<AuthOptions> = {}): AuthOptions {
	return {
		broadcastChannel: new BroadcastChannel("authlocal_auth"),
		delegatorUrl: options.delegatorUrl ?? "https://authlocal.org/",
		cubby: options.cubby ?? (
			new Kv(new StorageMagazine())
				.scope("authlocal")
				.cell<Session>("session")
		),
	}
}

