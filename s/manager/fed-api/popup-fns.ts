
import {deferPromise} from "@benev/slate"
import {Purpose} from "../logic/purpose.js"
import {Future} from "../../tools/future.js"
import {Proofs} from "../../auth2/proofs.js"
import {Proof, Session} from "../../auth2/concepts.js"
import {generateKeypair} from "../../auth2/crypto.js"

export type PopupState = {
	parentOrigin: string
}

export type PopupFns = {
	v2: {
		pleaseLogin: () => Promise<Session>
	},
}

export const makePopupFns = (
		event: MessageEvent,
		state: PopupState,
		setLoginPurpose: (login: Purpose.Login) => void,
	): PopupFns => ({

	v2: {
		async pleaseLogin() {
			const audience = event.origin
			state.parentOrigin = audience
			const expiresAt = Future.days(7)
			const issuer = window.origin
			const {hostname} = new URL(audience)
			const deferredSession = deferPromise<Session>()
			setLoginPurpose({
				kind: "login",
				audience,
				hostname,
				onLogin: async passport => {
					const sessionKeypair = await generateKeypair()
					const proof: Proof = {
						passportId: passport.id,
						sessionId: sessionKeypair.id,
					}
					deferredSession.resolve({
						secret: sessionKeypair.secret,
						proofToken: await Proofs.sign(passport.secret, proof, {
							expiresAt,
							issuer,
							audience,
						}),
					})
				},
			})
			return deferredSession.promise
		},
	},
})

