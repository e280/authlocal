
import {endpoint, Messenger, WindowConduit} from "@e280/renraku"
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

	const conduit = new WindowConduit(
		appWindow,
		popupWindow,
		popupOrigin,
		({origin}) => {
			return origin === popupOrigin
		},
	)

	new Messenger({
		conduit,
		timeout: Infinity,
		getLocalEndpoint: () => endpoint({fns: makeAppFns(login)}),
	})

	return {
		dispose: () => conduit.dispose(),
	}
}

