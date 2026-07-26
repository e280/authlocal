
import {isYay} from "@e280/stz"
import {Session} from "../session.js"
import {verifyDelegate} from "../../core/alco/verify-delegate.js"

export function isSessionValid(session: Session, delegatorOrigin: string) {
	return isYay(
		verifyDelegate(session.delegates.login, {
			allowedPurposes: ["login"],
			allowedDelegators: [delegatorOrigin],
			allowedPetitioners: [window.location.origin],
		})
	)
}

