
import {PopupFns} from "./popup-fns.js"
import {LoginSessionTokens} from "../../auth/tokens/types.js"

/*
interactions between app and popup
1. app.ready()
2. popup.requestLogin()
3. app.login()
*/

export type AppFns = {
	ready: () => Promise<void>
	login: (tokens: LoginSessionTokens) => Promise<void>
}

export const makeAppFns = (
		handleLogin: (tokens: LoginSessionTokens) => void,
		popup: PopupFns,
	): AppFns => {

	return {
		async ready() {
			await popup.pleaseLogin()
		},

		async login(tokens: LoginSessionTokens) {
			handleLogin(tokens)
		},
	}
}

