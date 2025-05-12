
import {Messenger, WindowConduit} from "renraku"
import {AppFns} from "./app-fns.js"

//
// this facilitates postMessages,
// and is installed on the authority side
//

export function setupInPopup(
		popupWindow: Window,
		appWindow: WindowProxy,
		appOrigin: string,
	) {

	const conduit = new WindowConduit(
		popupWindow,
		appWindow,
		appOrigin,
		({origin}) => origin === appOrigin,
	)

	const messenger = new Messenger<AppFns>({
		conduit,
		timeout: Infinity,
	})

	return {
		app: messenger.remote as AppFns,
		dispose: () => conduit.dispose(),
	}
}

