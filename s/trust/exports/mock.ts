
import {Time} from "../../tools/time.js"
import {Login} from "../concepts/session/login.js"
import {generateSession} from "../concepts/session/session.js"
import {generateIdentity} from "../concepts/identity/identity.js"

export class Mock {
	constructor(public options: {
		appOrigin?: string
		authorityOrigin?: string
	} = {}) {}

	async login({
			expiresAt = Time.future.minutes(5),
		}: {
			expiresAt?: number
		}) {

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

