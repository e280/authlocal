
import {Delegate, Petition} from "../core/alco/types.js"

export type StandardDelegates = {
	login: Delegate
	encryption: Delegate
}

export type DelegatorApi = {
	requestDelegates(petitions: Petition[]): Promise<void>
}

export type PetitionerApi = {
	deliverDelegates(delegates: Delegate[]): Promise<void>
}

