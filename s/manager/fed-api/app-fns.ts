
import {PopupFns} from "./popup-fns.js"
import {Session} from "../../auth2/concepts.js"

export type AppFns = {
	v2: {
		ready: () => Promise<void>
	}
}

export const makeAppFns = (
		handleLogin: (session: Session) => void,
		popup: PopupFns,
	): AppFns => {

	return {
		v2: {
			async ready() {
				const session = await popup.v2.pleaseLogin()
				handleLogin(session)
			},
		},
	}
}

