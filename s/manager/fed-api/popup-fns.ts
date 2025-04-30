
import {deferPromise} from "@benev/slate"
import {Purpose} from "../logic/purpose.js"
import {Future} from "../../tools/future.js"
import {Proofs} from "../../crypto/proofs.js"
import {generateKeypair} from "../../crypto/core.js"
import {Proof, Session} from "../../crypto/concepts.js"

export type PopupState = {
	parentOrigin: string
}

export type PopupFns = {
	v2: {
		pleaseLogin: () => Promise<Session>
	},
}

export const makePopupFns = (
		audience: string,
		setLoginPurpose: (login: Purpose.Login) => void,
	): PopupFns => ({

	v2: {
		async pleaseLogin() {
			const expiresAt = Future.days(7)
			const issuer = window.origin
			const {hostname} = new URL(audience)
			const deferredSession = deferPromise<Session>()

			setLoginPurpose({
				kind: "login",
				audience,
				hostname,
				onPassport: async passport => {
					const sessionKeypair = await generateKeypair()
					const proof: Proof = {
						scope: "proof",
						sessionId: sessionKeypair.id,
						passport: {id: passport.id, label: passport.label},
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

