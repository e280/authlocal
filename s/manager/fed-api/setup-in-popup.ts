
import {endpoint, Messenger, WindowConduit} from "renraku"

import {AppFns} from "./app-fns.js"
import {Purpose} from "../logic/purpose.js"
import {makePopupFns} from "./popup-fns.js"

export function setupInPopup(
		appOrigin: string,
		appWindow: WindowProxy,
		setLoginPurpose: (purpose: Purpose.Login) => void,
	) {

	const messenger = new Messenger<AppFns>({
		timeout: Infinity,
		conduit: new WindowConduit(appWindow, appOrigin, ({origin}) => origin === appOrigin),
		getLocalEndpoint: () => endpoint(makePopupFns(appOrigin, setLoginPurpose))
	})

	return messenger.remote as AppFns
}

