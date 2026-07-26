
import {Cubby} from "@e280/stz"
import {Delegate, Petition} from "../core/alco/types.js"

export type Session = {
	login: Delegate
	encryption: Delegate
}

export type SessionOptions = {
	expiresAt: number
	encryptionScope: string
}

export type AuthOptions = {
	delegatorUrl: string
	cubby: Cubby<Session>
}

export type DelegatorApi = {
	v1: {
		requestDelegates(petitions: Petition[]): Promise<Delegate[]>
	}
}

