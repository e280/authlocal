
import {PopupFns} from "./popup-fns.js"
import {Session} from "../../core/session.js"

export type AppFns = {
	v3: {
		ready: () => Promise<void>
	}
}

export const makeAppFns = (
		handleSession: (session: Session) => void,
		popup: PopupFns,
	): AppFns => {

	return {
		v3: {
			async ready() {
				const session = await popup.v3.pleaseLogin()
				handleSession(session)
			},
		},
	}
}

