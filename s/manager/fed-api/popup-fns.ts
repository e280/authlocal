
import {AppFns} from "./app-fns.js"
import {Purpose} from "../logic/purpose.js"

export type PopupState = {
	parentOrigin: string
}

export type PopupFns = {
	pleaseLogin: () => Promise<void>
}

export const makePopupFns = (
		event: MessageEvent,
		state: PopupState,
		app: AppFns,
		setLoginPurpose: (login: Purpose.Login) => void,
	): PopupFns => {
	return {

		async pleaseLogin() {
			const audience = event.origin
			state.parentOrigin = audience
			const day = (1000 * 60 * 60 * 24)
			const expiry = Date.now() + (7 * day)
			const issuer = window.origin
			setLoginPurpose({
				kind: "login",
				onLogin: async passport => {
					const token = await passport.signLoginToken({issuer, audience, expiry})
					await app.login(token)
				},
			})
		},
	}
}

