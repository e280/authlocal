
import {Kv, StorageMagazine} from "@e280/kv"
import {consts} from "../../../consts.js"
import {Session} from "../types/session.js"
import {AuthOptions} from "../types/auth-options.js"

export const defaultAuthOptions = (options: Partial<AuthOptions> = {}): AuthOptions => ({

	/** delegator app used for logins, defaults to `"https://authlocal.org/"`. */
	delegatorUrl: options.delegatorUrl ?? (
		"https://authlocal.org/"
	),

	/** stores the user session. */
	sessionCubby: options.sessionCubby ?? (
		new Kv(new StorageMagazine())
			.scope(consts.namespace)
			.cell<Session>("session")
	),

	/** broadcast channel for cross-tab sync. */
	broadcastChannel: options.broadcastChannel ?? (
		new BroadcastChannel(`${consts.namespace}.auth`)
	),
})

