
import {Cubby} from "@e280/stz"
import {Delegate, Petition} from "../core/alco/types.js"

export type StandardDelegates = {
	login: Delegate
	encryption: Delegate
}

export type AuthOptions = {
	delegatorUrl: string
	cubby: Cubby<StandardDelegates>
}

export type DelegatorApi = {
	requestDelegates(petitions: Petition[]): Promise<Delegate[]>
}

