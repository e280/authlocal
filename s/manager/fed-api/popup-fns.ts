
import {AppFns} from "./app-fns.js"
import {Purpose} from "../logic/purpose.js"
import {Future} from "../../tools/future.js"

export type PopupState = {
	parentOrigin: string
}

export type PopupFns = {
	v1: {
		pleaseLogin: () => Promise<void>
	},
}

export const makePopupFns = (
		event: MessageEvent,
		state: PopupState,
		app: AppFns,
		setLoginPurpose: (login: Purpose.Login) => void,
	): PopupFns => {
	return {
		v1: {
			async pleaseLogin() {
				const audience = event.origin
				state.parentOrigin = audience
				const expiresAt = Future.days(7)
				const issuer = window.origin
				setLoginPurpose({
					kind: "login",
					audience,
					onLogin: async passport => {
						const tokens = await passport.signLoginTokens({issuer, audience, expiresAt})
						await app.v1.login(tokens)
					},
				})
			},
		},
	}
}

