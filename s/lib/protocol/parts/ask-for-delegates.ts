
import {StandardDelegates} from "../types.js"
import {Petition} from "../../core/alco/types.js"
import {connectToDelegator} from "./connect-to-delegator.js"

export async function askForDelegates(
		popup: Window,
		petitions: Petition[],
	): Promise<StandardDelegates> {

	const portal = await connectToDelegator(popup)

	const [login, encryption] = await portal.remote.v1.requestDelegates(petitions)
	portal.close()
	popup.close()

	return {login, encryption}
}

