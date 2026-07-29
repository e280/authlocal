
import {Delegate, Petition} from "../../core/alco/delegate/types.js"

export type DelegatorApi = {
	v1: {
		requestDelegates(petitions: Petition[]): Promise<Delegate[]>
	}
}

