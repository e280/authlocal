
import {Session} from "../types.js"
import {consts} from "../../../consts.js"
import {verifyDelegate} from "../../core/alco/verify-delegate.js"

export function isSessionValid(
		session: Session,
		appOrigin = window.location.origin,
	) {

	return verifyDelegate(session.auth, {
		allowedApps: [appOrigin],
		allowedPurposes: Object.values(consts.purposes),
	}).yay
}

