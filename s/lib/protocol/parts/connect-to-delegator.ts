
import {Portal} from "@e280/renraku"
import {recvPort, webAutoTransfer} from "@e280/renraku/web"

import {consts} from "../../../consts.js"
import {DelegatorApi} from "../types.js"

export async function connectToDelegator(popup: Window, delegatorOrigin: string) {
	const {port} = await recvPort({
		from: popup,
		topic: consts.namespace,
		fromOrigin: delegatorOrigin,
	})

	return new Portal<DelegatorApi>({
		port,
		timeout: Infinity,
		autoTransfer: webAutoTransfer,
	})
}

