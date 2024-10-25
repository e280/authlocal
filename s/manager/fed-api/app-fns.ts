
import {PopupFns} from "./popup-fns.js"

/*
interactions between app and popup
1. app.ready()
2. popup.requestLogin()
3. app.login()
*/

export type AppFns = {
	ready: () => Promise<void>
	login: (token: string) => Promise<void>
}

export const makeAppFns = (handleLogin: (token: string) => void, popup: PopupFns): AppFns => {
	return {

		async ready() {
			await popup.pleaseLogin()
		},

		async login(token: string) {
			handleLogin(token)
		},
	}
}

