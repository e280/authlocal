
import {Kv, StorageMagazine} from "@e280/kv"
import {consts} from "../../../consts.js"
import {AuthOptions, Session} from "../types.js"

export function defaultifyAuthOptions(options: Partial<AuthOptions> = {}): AuthOptions {
	return {
		broadcastChannel: new BroadcastChannel(`${consts.namespace}.auth`),
		delegatorUrl: options.delegatorUrl ?? "https://authlocal.org/",
		sessionCubby: options.sessionCubby ?? (
			new Kv(new StorageMagazine())
				.scope(consts.namespace)
				.cell<Session>("session")
		),
	}
}

