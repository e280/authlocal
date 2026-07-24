
import {Portal} from "@e280/renraku"
import {sendPort, webAutoTransfer} from "@e280/renraku/web"
import {consts} from "../consts.js"
import {AppApi, AuthorityApi} from "./types.js"

export async function connectToApp(opener: Window, setupApi: (appOrigin: string) => AuthorityApi) {
	const {port, origin: appOrigin} = await sendPort({
		to: opener,
		topic: consts.postMessageTopic,
	})

	return new Portal<AppApi>({
		port,
		fns: setupApi(appOrigin),
		autoTransfer: webAutoTransfer,
	}).remote
}

