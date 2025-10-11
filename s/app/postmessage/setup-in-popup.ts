
import {concurrent, defer} from "@e280/stz"
import {Messenger, WindowConduit} from "@e280/renraku"
import {AppFns} from "./app-fns.js"

/**
 * this facilitates postMessages,
 * and is installed on the authority side
 * - we generate an identity for the user.
 * - the user can save their seed, or recover their identity from seed.
 * - when the user clicks "login", we generate a login session,
 *   and we send that to the consumer app via postmessage.
 */
export function setupInPopup(
		popupWindow: Window,
		appWindow: WindowProxy,
	) {

	const conduit = new WindowConduit({
		localWindow: popupWindow,
		targetWindow: appWindow,
		targetOrigin: "*",
		allow: () => true,
	})

	const appOriginDeferred = defer<string>()
	conduit.recv.sub((_m, {origin}) => {
		conduit.targetOrigin = origin
		appOriginDeferred.resolve(origin)
	})

	const messenger = new Messenger<any, AppFns>({
		conduit,
		timeout: Infinity,
	})

	async function sayHelloAndGetMandateAndAppOrigin() {
		return concurrent({
			mandate: messenger.remote.v1.hello(),
			appOrigin: appOriginDeferred.promise,
		})
	}

	return {
		sayHelloAndGetMandateAndAppOrigin,
		app: messenger.remote as AppFns,
		dispose: () => conduit.dispose(),
	}
}

