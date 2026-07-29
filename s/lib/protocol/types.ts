
import {Cubby} from "@e280/stz"
import {Delegate, Petition} from "../core/alco/delegate/types.js"

export type AuthOptions = {

	/** delegator app used for logins, defaults to `"https://authlocal.org/"`. */
	delegatorUrl: string

	/** stores the user session. */
	sessionCubby: Cubby<Session>

	/** broadcast channel for cross-tab sync. */
	broadcastChannel: BroadcastChannel
}

export type Session = {
	auth: Delegate
	crypt: Delegate
}

export type SessionOptions = {
	expiresAt: number
	cryptScope: string
}

export type DelegatorApi = {
	v1: {
		requestDelegates(petitions: Petition[]): Promise<Delegate[]>
	}
}

