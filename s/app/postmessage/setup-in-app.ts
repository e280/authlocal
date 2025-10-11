
import {Messenger, WindowConduit} from "@e280/renraku"
import {makeAppFns} from "./app-fns.js"
import {FlowMandate, FlowPayload} from "./types.js"

/**
 * this facilitates postMessages,
 * and is installed on the consumer app side
 * - we are connected to the authority via a postmessage api.
 * - we receive a session from the authority via postmessage.
 * - we verify the session as a login object.
 * - we use the login object to sign claim tokens.
 * - we verify claim tokens, on our serverside or clientside.
 */
export function setupInApp(
		appWindow: Window,
		popupWindow: WindowProxy,
		popupOrigin: string,
		flow: FlowMandate,
		deliver: (payload: FlowPayload | null) => Promise<void>
	) {

	const conduit = new WindowConduit({
		localWindow: appWindow,
		targetWindow: popupWindow,
		targetOrigin: popupOrigin,
		allow: e => e.origin === popupOrigin,
	})

	const messenger = new Messenger({
		conduit,
		timeout: Infinity,
		rpc: async() => makeAppFns(flow, deliver),
	})

	return {
		dispose: () => {
			conduit.dispose()
			messenger.dispose()
		},
	}
}

