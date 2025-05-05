
import {endpoint, Messenger, WindowConduit} from "renraku"
import {PopupFns} from "./popup-fns.js"
import {makeAppFns} from "./app-fns.js"
import {Session} from "../../core/session.js"

export function setupInApp(
		popupOrigin: string,
		popupWindow: WindowProxy,
		handleSession: (session: Session) => void,
	) {

	const conduit = new WindowConduit(
		popupWindow,
		popupOrigin,
		({origin}) => origin === popupOrigin,
	)

	const messenger = new Messenger<PopupFns>({
		conduit,
		timeout: Infinity,
		getLocalEndpoint: remote => endpoint(makeAppFns(handleSession, remote)),
	})

	return {
		popup: messenger.remote as PopupFns,
		dispose: () => conduit.dispose(),
	}
}

