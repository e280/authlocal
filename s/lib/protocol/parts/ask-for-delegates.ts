
import {defer} from "@e280/stz"
import {wirePort, Messenger} from "@e280/renraku"
import {acceptWindowPorts, autoTransfer} from "@e280/renraku/web"

import {DelegatorApi} from "./types.js"
import {consts} from "../../../consts.js"
import {Delegate, Petition} from "../../core/alco/delegate/types.js"

export async function askForDelegates(
		popup: Window,
		delegatorOrigin: string,
		petitions: Petition[],
	) {

	const deferred = defer<Delegate[]>()

	const stop = acceptWindowPorts({
		from: popup,
		origin: delegatorOrigin,
		topic: consts.namespace,

		onPort: port => {
			const portal = wirePort({
				port,
				autoTransfer,
				messenger: new Messenger<DelegatorApi>(
					undefined,
					Infinity,
				),
			})

			deferred.entangle(
				portal.remote.v1.requestDelegates(petitions)
			).finally(() => {
				portal.dispose()
				portal.messenger.dispose()
				portal.port.close()
				popup.close()
				stop()
			})
		},
	})

	return deferred.promise
}

