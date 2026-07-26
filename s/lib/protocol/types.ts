
import {Cubby} from "@e280/stz"
import {Delegate, Petition} from "../core/alco/types.js"

export type StandardDelegates = {
	login: Delegate
	encryption: Delegate
}

export type StandardPetitionOptions = {
	expiresAt: number
	encryptionScope: string
}

export type AuthOptions = {
	delegatorUrl: string
	cubby: Cubby<StandardDelegates>
}

export type DelegatorApi = {
	v1: {
		requestDelegates(petitions: Petition[]): Promise<Delegate[]>
	}
}

