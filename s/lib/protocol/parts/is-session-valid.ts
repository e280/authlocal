
import {Session} from "../types.js"
import {verifyDelegate} from "../../core/alco/verify-delegate.js"
import { consts } from "../../../consts.js"

export function isSessionValid(
		session: Session,
		petitionerOrigin = window.location.origin,
	) {

	return verifyDelegate(session.login, {
		allowedPetitioners: [petitionerOrigin],
		allowedPurposes: Object.values(consts.purposes),
	}).yay
}

