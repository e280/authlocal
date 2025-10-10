
import {Time} from "@e280/stz"
import {Login} from "../../trust/concepts/session/login.js"
import {generateSession} from "../../trust/concepts/session/session.js"
import {generateIdentity} from "../../trust/concepts/identity/identity.js"

export class Mock {
	constructor(public options: {
		appOrigin?: string
		authorityOrigin?: string
	} = {}) {}

	async login({
			expiresAt = Time.future.minutes(5),
		}: {
			expiresAt?: number
		} = {}) {

		const o = "https://example.e280.org"
		const {appOrigin = o, authorityOrigin = o} = this.options

		const identity = await generateIdentity()

		const session = await generateSession({
			identity,
			expiresAt,
			appOrigin,
			authorityOrigin,
		})

		return Login.verify({
			session,
			appOrigins: [appOrigin],
		})
	}
}

