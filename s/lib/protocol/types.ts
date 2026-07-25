
import {Delegate, Petition} from "../core/alco/types.js"

export type AuthorityApi = {
	requestDelegates(petitions: Petition[]): Promise<void>
}

export type AppApi = {
	deliverDelegates(delegates: Delegate[]): Promise<void>
}

