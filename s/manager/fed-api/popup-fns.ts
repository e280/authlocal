
import {Signal} from "@benev/slate"
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
		purpose: Signal<Purpose.Any>,
		app: AppFns,
	): PopupFns => {
	return {

		async pleaseLogin() {
			const audience = event.origin
			state.parentOrigin = audience
			const day = (1000 * 60 * 60 * 24)
			const expiry = Date.now() + (1 * day)
			const issuer = window.origin
			purpose.value = {
				kind: "login",
				onLogin: async id => {
					const token = await id.signLoginToken({issuer, audience, expiry})
					await app.login(token)
				},
			}
		},
	}
}

