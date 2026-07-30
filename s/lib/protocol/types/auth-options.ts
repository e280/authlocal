
import {Cubby} from "@e280/stz"
import {Session} from "./session.js"

export type AuthOptions = {

	/** delegator app used for logins, defaults to `"https://authlocal.org/"`. */
	delegatorUrl: string

	/** stores the user session. */
	sessionCubby: Cubby<Session>

	/** broadcast channel for cross-tab sync. */
	broadcastChannel: BroadcastChannel
}

