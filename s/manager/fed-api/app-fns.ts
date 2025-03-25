
import {PopupFns} from "./popup-fns.js"
import {Login} from "../../auth/login.js"

export type AppFns = {
	v2: {
		ready: () => Promise<void>
	}
}

export const makeAppFns = (
		handleLogin: (login: Login) => void,
		popup: PopupFns,
	): AppFns => {

	return {
		v2: {
			async ready() {
				const session = await popup.v2.pleaseLogin()
				const login = await Login.verify(session)
				handleLogin(login)
			},
		},
	}
}

