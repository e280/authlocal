
import {Delegate, Petition} from "../lib/alco/types.js"

export type AuthorityApi = {
	requestDelegates(petitions: Petition[]): Promise<void>
}

export type AppApi = {
	deliverDelegates(delegates: Delegate[]): Promise<void>
}

