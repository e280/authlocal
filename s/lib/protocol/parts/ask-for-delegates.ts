
import {Petition} from "../../core/alco/delegate/types.js"
import {connectToDelegator} from "./connect-to-delegator.js"

export async function askForDelegates(
		popup: Window,
		delegatorOrigin: string,
		petitions: Petition[],
	) {

	const portal = await connectToDelegator(popup, delegatorOrigin)

	try {
		return await portal.remote.v1.requestDelegates(petitions)
	}
	finally {
		portal.close()
		popup.close()
	}
}

