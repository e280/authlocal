
import {Portal} from "@e280/renraku"
import {sendPort, webAutoTransfer} from "@e280/renraku/web"
import {DelegatorApi} from "./types.js"
import {consts} from "../../../consts.js"

export async function connectToApp(opener: Window, setupApi: (appOrigin: string) => DelegatorApi) {
	const {port, origin: appOrigin} = await sendPort({
		to: opener,
		topic: consts.namespace,
	})

	return new Portal({
		port,
		timeout: Infinity,
		autoTransfer: webAutoTransfer,
		fns: setupApi(appOrigin),
	})
}

