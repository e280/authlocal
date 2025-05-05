
import {endpoint, Messenger, WindowConduit} from "renraku"
import {makeAppFns} from "./app-fns.js"
import {Session} from "../../core/session.js"

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
		getLocalEndpoint: () => endpoint(makeAppFns(login)),
	})

	return {
		dispose: () => conduit.dispose(),
	}
}

