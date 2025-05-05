
import {endpoint, Messenger, WindowConduit} from "renraku"
import {AppFns} from "./app-fns.js"
import {Purpose} from "../logic/purpose.js"
import {makePopupFns} from "./popup-fns.js"

export function setupInPopup(
		appOrigin: string,
		appWindow: WindowProxy,
		setLoginPurpose: (purpose: Purpose.Login) => void,
	) {

	const conduit = new WindowConduit(
		appWindow,
		appOrigin,
		({origin}) => origin === appOrigin,
	)

	const messenger = new Messenger<AppFns>({
		conduit,
		timeout: Infinity,
		getLocalEndpoint: () => endpoint(makePopupFns(appOrigin, setLoginPurpose))
	})

	return {
		app: messenger.remote as AppFns,
		dispose: () => conduit.dispose(),
	}
}

