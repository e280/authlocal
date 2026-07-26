
import {isYay} from "@e280/stz"
import {Session} from "../session.js"
import {verifyDelegate} from "../../core/alco/verify-delegate.js"

export function isSessionValid(session: Session) {
	return isYay(
		verifyDelegate(session.delegates.login, {
			allowedPurposes: ["login"],
			allowedPetitioners: [window.location.origin],
		})
	)
}

