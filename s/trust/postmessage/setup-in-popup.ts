
import {defer} from "@e280/stz"
import {Messenger, WindowConduit} from "@e280/renraku"
import {AppFns} from "./app-fns.js"

//
// this facilitates postMessages,
// and is installed on the authority side
//

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

	async function helloAndGetAppOrigin() {
		await messenger.remote.v1.hello()
		return appOriginDeferred.promise
	}

	return {
		helloAndGetAppOrigin,
		app: messenger.remote as AppFns,
		dispose: () => conduit.dispose(),
	}
}

