
import {consts} from "../../../consts.js"
import {Session} from "../types/session.js"
import {verifyDelegate} from "../../core/alco/delegate/verify.js"

export function isSessionValid(
		session: Session,
		appOrigin = window.location.origin,
	) {

	try {
		const auth = verifyDelegate(session.auth, {
			allowedAudiences: [appOrigin],
			allowedPurposes: [consts.purposes.auth],
		})

		const crypt = verifyDelegate(session.crypt, {
			allowedAudiences: [appOrigin],
			allowedPurposes: [consts.purposes.crypt],
		})

		return auth.proof.id === crypt.proof.id
	}
	catch (error) {
		console.error(error)
		return false
	}
}

