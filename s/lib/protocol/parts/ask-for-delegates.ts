
import {defer} from "@e280/stz"
import {Portal} from "@e280/renraku"
import {recvPorts, webAutoTransfer} from "@e280/renraku/web"
import {DelegatorApi} from "./types.js"
import {consts} from "../../../consts.js"
import {Delegate, Petition} from "../../core/alco/delegate/types.js"

export async function askForDelegates(
		popup: Window,
		delegatorOrigin: string,
		petitions: Petition[],
	) {

	const deferred = defer<Delegate[]>()

	const stop = recvPorts({
		from: popup,
		fromOrigin: delegatorOrigin,
		topic: consts.namespace,
		onPort: port => {
			const portal = new Portal<DelegatorApi>({
				port,
				timeout: Infinity,
				autoTransfer: webAutoTransfer,
			})
			deferred.entangle(portal.remote.v1.requestDelegates(petitions))
				.finally(() => {
					portal.close()
					popup.close()
					stop()
				})
		},
	})

	return deferred.promise
}

