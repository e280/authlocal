
import {Messenger, WindowConduit} from "@e280/renraku"
import {makeAppFns} from "./app-fns.js"
import {Session} from "../concepts/session/types.js"

//
// this facilitates postMessages,
// and is installed on the consumer app side
//

export function setupInApp(
		appWindow: Window,
		popupWindow: WindowProxy,
		popupOrigin: string,
		login: (session: Session | null) => Promise<void>,
	) {

	const conduit = new WindowConduit({
		localWindow: appWindow,
		targetWindow: popupWindow,
		targetOrigin: popupOrigin,
		allow: e => e.origin === popupOrigin,
	})

	new Messenger({
		conduit,
		timeout: Infinity,
		rpc: async() => makeAppFns(login),
	})

	return {
		dispose: () => conduit.dispose(),
	}
}

