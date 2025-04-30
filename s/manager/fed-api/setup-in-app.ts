
import {endpoint, Messenger, WindowConduit} from "renraku"
import {PopupFns} from "./popup-fns.js"
import {makeAppFns} from "./app-fns.js"
import {Login} from "../../auth/login.js"

export function setupInApp(
		popupOrigin: string,
		popupWindow: WindowProxy,
		handleLogin: (login: Login) => void,
	) {

	const messenger = new Messenger<PopupFns>({
		timeout: Infinity,
		conduit: new WindowConduit(popupWindow, popupOrigin, ({origin}) => origin === popupOrigin),
		getLocalEndpoint: remote => endpoint(makeAppFns(handleLogin, remote)),
	})

	return messenger.remote as PopupFns
}

