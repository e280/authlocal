
import {Delegate, Petition} from "../core/alco/types.js"

export type StandardDelegates = {
	login: Delegate
	encryption: Delegate
}

export type DelegatorApi = {
	requestDelegates(petitions: Petition[]): Promise<Delegate[]>
}

