
import {PostMessenger} from "renraku"
import {PopupFns} from "./popup-fns.js"
import {makeAppFns} from "./app-fns.js"

export function setupInApp(
		appWindow: Window,
		popupWindow: WindowProxy,
		popupOrigin: string,
		handleLogin: (token: string) => void,
	) {

	const peer = new PostMessenger<PopupFns>({
		local: {
			window: appWindow,
			getFns: (_event, popup) => makeAppFns(handleLogin, popup),
		},
		remote: {
			window: popupWindow,
			getOrigin: () => popupOrigin,
		},
	})

	return {
		dispose: peer.dispose,
		popupFns: peer.remote as PopupFns,
	}
}

