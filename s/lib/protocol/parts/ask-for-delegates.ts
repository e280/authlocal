
import {Petition} from "../../core/alco/types.js"
import {connectToDelegator} from "./connect-to-delegator.js"

export async function askForDelegates(popup: Window, petitions: Petition[]) {
	const portal = await connectToDelegator(popup)

	try {
		return await portal.remote.v1.requestDelegates(petitions)
	}
	finally {
		portal.close()
		popup.close()
	}
}

