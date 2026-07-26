
import {isYay} from "@e280/stz"
import {User} from "../user.js"
import {verifyDelegate} from "../../core/alco/verify-delegate.js"

export function isSessionValid(
		session: User,
		petitionerOrigin = window.location.origin,
	) {

	return isYay(
		verifyDelegate(session.session.login, {
			allowedPetitioners: [petitionerOrigin],
		})
	)
}

