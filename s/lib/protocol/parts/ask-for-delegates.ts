
import {Petition} from "../../core/alco/types.js"
import {connectToDelegator} from "./connect-to-delegator.js"

export async function askForDelegates(popup: Window, petitions: Petition[]) {
	const portal = await connectToDelegator(popup)
	const delegates = await portal.remote.v1.requestDelegates(petitions)
	portal.close()
	popup.close()
	return delegates
}

