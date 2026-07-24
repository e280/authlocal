
import {Portal} from "@e280/renraku"
import {recvPort, webAutoTransfer} from "@e280/renraku/web"

import {consts} from "../consts.js"
import {AppApi, AuthorityApi} from "./types.js"

export async function connectToAuthority(popup: Window, fns: AppApi) {
	const {port} = await recvPort({
		from: popup,
		topic: consts.postMessageTopic,
		fromOrigin: "http://localhost:8080",
		timeout: Infinity,
	})

	return new Portal<AuthorityApi>({
		fns,
		port,
		autoTransfer: webAutoTransfer,
	}).remote
}

