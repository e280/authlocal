
import {makeEndpoint, Messenger, wirePort} from "@e280/renraku"
import {autoTransfer, offerWindowPort} from "@e280/renraku/web"
import {DelegatorApi} from "./types.js"
import {consts} from "../../../consts.js"

export async function connectToApp(opener: Window, setupApi: (appOrigin: string) => DelegatorApi) {
	const {port, event: {origin: appOrigin}} = await offerWindowPort({
		to: opener,
		topic: consts.namespace,
	})

	return wirePort({
		port,
		autoTransfer,
		messenger: new Messenger(makeEndpoint(setupApi(appOrigin)), Infinity),
	})
}

