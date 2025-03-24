
import {PostMessenger} from "renraku"

import {AppFns} from "./app-fns.js"
import {Purpose} from "../logic/purpose.js"
import {makePopupFns, PopupState} from "./popup-fns.js"

export function setupInPopup(
		appWindow: WindowProxy,
		popupWindow: Window,
		setLoginPurpose: (purpose: Purpose.Login) => void
	) {

	const state: PopupState = {parentOrigin: "*"}

	const peer = new PostMessenger<AppFns>({
		local: {
			window: popupWindow,
			getFns: event => makePopupFns(event, state, setLoginPurpose),
		},
		remote: {
			window: appWindow,
			getOrigin: () => state.parentOrigin,
		},
	})

	return {
		dispose: peer.dispose,
		appFns: peer.remote as AppFns,
	}
}

