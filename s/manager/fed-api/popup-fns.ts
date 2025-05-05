
import {deferPromise} from "@benev/slate"
import {Purpose} from "../logic/purpose.js"
import {Future} from "../../tools/future.js"
import {Session} from "../../core/session.js"
import {generateKeypair} from "../../core/crypto.js"
import {Proof, signProof} from "../../core/proof.js"

export type PopupState = {
	parentOrigin: string
}

export type PopupFns = {
	v3: {
		pleaseLogin: () => Promise<Session>
	},
}

export const makePopupFns = (
		audience: string,
		setLoginPurpose: (login: Purpose.Login) => void,
	): PopupFns => ({

	v3: {
		async pleaseLogin() {
			const expiresAt = Future.days(7)
			const issuer = window.origin
			const {hostname} = new URL(audience)
			const deferredSession = deferPromise<Session>()
			setLoginPurpose({
				kind: "login",
				audience,
				hostname,
				onDeny: async() => {
					deferredSession.reject("denied")
				},
				onPassport: async passport => {
					const sessionKeypair = await generateKeypair()
					const proof: Proof = {
						scope: "proof",
						sessionId: sessionKeypair.id,
						passport: {id: passport.id, label: passport.label},
					}
					deferredSession.resolve({
						secret: sessionKeypair.secret,
						proofToken: await signProof(passport.secret, proof, {
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

