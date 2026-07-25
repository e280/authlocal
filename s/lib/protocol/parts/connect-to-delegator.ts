
import {Portal} from "@e280/renraku"
import {recvPort, webAutoTransfer} from "@e280/renraku/web"

import {consts} from "../../../consts.js"
import {PetitionerApi, DelegatorApi} from "../types.js"

export async function connectToDelegator(popup: Window, fns: PetitionerApi) {
	const {port} = await recvPort({
		from: popup,
		topic: consts.postMessageTopic,
		fromOrigin: "http://localhost:8080",
		timeout: Infinity,
	})

	return new Portal<DelegatorApi>({
		fns,
		port,
		autoTransfer: webAutoTransfer,
	}).remote
}

