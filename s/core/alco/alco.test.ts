
import {time} from "@e280/stz"
import {suite, test, expect} from "@e280/science"

import {scopes} from "./scopes.js"
import {deriveViceroy} from "./viceroy.js"
import {deriveId} from "../cryp/derive.js"
import {generateSecret} from "../cryp/gen.js"
import {signDelegate, verifyDelegate} from "./delegation.js"

export default suite({
	"login flow": test(async() => {

		// authlocal locally keeps the user's root secret
		const root = generateSecret()

		// authlocal derives a viceroy secret for each origin requesting access
		const viceroy = deriveViceroy(root, "https://e280.org")

		// authlocal signs a delegate with the viceroy
		const delegate = signDelegate(viceroy, {
			scope: scopes.login,
			expiresAt: time.future.hours(1),
		})

		expect(delegate.signedBy).is(deriveId(viceroy))
		expect(() => verifyDelegate(delegate)).not.throws()
		expect(() => verifyDelegate({...delegate, signedBy: generateSecret()})).throws()
	}),
})

