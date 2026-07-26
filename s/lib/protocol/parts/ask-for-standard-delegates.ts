
import {time} from "@e280/stz"
import {StandardDelegates} from "../types.js"
import {connectToDelegator} from "./connect-to-delegator.js"
import {generateSecret} from "../../core/cryp/generate-secret.js"

export async function askForStandardDelegates(
		popup: Window,
		encryptionScope: string,
	): Promise<StandardDelegates> {

	const portal = await connectToDelegator(popup)

	const [login, encryption] = await portal.remote.requestDelegates([
		{purpose: "login", scope: generateSecret(), expiresAt: time.future.days(30)},
		{purpose: "", scope: "v1:" + encryptionScope, expiresAt: time.future.days(30)},
	])

	portal.close()
	popup.close()

	return {login, encryption}
}

