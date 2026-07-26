
import {isYay} from "@e280/stz"
import {Session} from "../session.js"
import {verifyDelegate} from "../../core/alco/verify-delegate.js"

export function isSessionValid(
		session: Session,
		petitionerOrigin = window.location.origin,
	) {

	return isYay(
		verifyDelegate(session.delegates.login, {
			allowedPetitioners: [petitionerOrigin],
		})
	)
}

