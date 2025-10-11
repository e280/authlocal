
import {time} from "@e280/stz"
import {Login} from "../../core/session/login.js"
import {defaultContext} from "../../core/crypto/crypto.js"
import {generateSession} from "../../core/session/session.js"
import {generateIdentity} from "../../core/identity/identity.js"

export class Mock {
	constructor(public options: {
		appOrigin?: string
		authorityOrigin?: string
		context?: string
	} = {}) {}

	async login({
			expiresAt = time.future.minutes(5),
		}: {
			expiresAt?: number
		} = {}) {

		const o = "https://example.e280.org"
		const {appOrigin = o, authorityOrigin = o, context = defaultContext} = this.options

		const identity = await generateIdentity()

		const session = await generateSession({
			identity,
			expiresAt,
			appOrigin,
			authorityOrigin,
			context,
		})

		return Login.verify({
			session,
			appOrigins: [appOrigin],
		})
	}
}

