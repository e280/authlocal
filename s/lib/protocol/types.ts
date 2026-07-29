
import {Cubby} from "@e280/stz"
import {Delegate, Petition} from "../core/alco/delegate/types.js"

export type Session = {
	auth: Delegate
	crypt: Delegate
}

export type SessionOptions = {
	expiresAt: number
	cryptScope: string
}

export type AuthOptions = {
	delegatorUrl: string
	sessionCubby: Cubby<Session>
	broadcastChannel: BroadcastChannel
}

export type DelegatorApi = {
	v1: {
		requestDelegates(petitions: Petition[]): Promise<Delegate[]>
	}
}

