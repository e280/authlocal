
import {AppFns} from "./app-fns.js"
import {Purpose} from "../logic/purpose.js"
import {Future} from "../../tools/from-now.js"

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
			const expiry = Future.days(7)
			const issuer = window.origin
			setLoginPurpose({
				kind: "login",
				onLogin: async passport => {
					const tokens = await passport.signLoginToken({issuer, audience, expiry})
					await app.login(tokens)
				},
			})
		},
	}
}

