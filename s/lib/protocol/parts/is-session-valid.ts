
import {Session} from "../types.js"
import {consts} from "../../../consts.js"
import {verifyDelegate} from "../../core/alco/verify-delegate.js"

export function isSessionValid(
		session: Session,
		appOrigin = window.location.origin,
	) {

	const maybeAuth = verifyDelegate(session.auth, {
		allowedApps: [appOrigin],
		allowedPurposes: [consts.purposes.auth],
	})

	if (!maybeAuth.yay)
		return false

	const maybeCrypt = verifyDelegate(session.crypt, {
		allowedApps: [appOrigin],
		allowedPurposes: [consts.purposes.crypt],
	})

	if (!maybeCrypt.yay)
		return false

	return maybeAuth.value.proof.id === maybeCrypt.value.proof.id
}

