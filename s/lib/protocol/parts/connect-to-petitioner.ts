
import {Portal} from "@e280/renraku"
import {sendPort, webAutoTransfer} from "@e280/renraku/web"
import {consts} from "../../../consts.js"
import {DelegatorApi} from "../types.js"

export async function connectToPetitioner(opener: Window, setupApi: (petitionerOrigin: string) => DelegatorApi) {
	const {port, origin: petitionerOrigin} = await sendPort({
		to: opener,
		topic: consts.postMessageTopic,
	})

	return new Portal({
		port,
		timeout: Infinity,
		autoTransfer: webAutoTransfer,
		fns: setupApi(petitionerOrigin),
	})
}

