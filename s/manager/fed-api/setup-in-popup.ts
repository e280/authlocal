
import {Signal} from "@benev/slate"
import {PostMessenger} from "renraku"

import {AppFns} from "./app-fns.js"
import {Purpose} from "../logic/purpose.js"
import {makePopupFns, PopupState} from "./popup-fns.js"

export function setupInPopup(
		appWindow: WindowProxy,
		popupWindow: Window,
		purpose: Signal<Purpose.Any>,
	) {

	const state: PopupState = {parentOrigin: "*"}

	const peer = new PostMessenger<AppFns>({
		local: {
			window: popupWindow,
			getFns: (event, app) => makePopupFns(event, state, purpose, app),
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

