
import {time} from "@e280/stz"
import {suite, test, expect} from "@e280/science"

import {scopes} from "./scopes.js"
import {deriveViceroy} from "./viceroy.js"
import {generateSecret} from "../cryp/gen.js"
import {signDelegate, verifyDelegate} from "./delegation.js"

export default suite({
	"login flow": test(async() => {
		const root = generateSecret()
		const viceroy = deriveViceroy(root, "https://e280.org")
		const delegate = signDelegate(viceroy, {
			scope: scopes.id,
			expiresAt: time.future.hours(1),
		})
		expect(delegate.signedBy).ok()
		expect(() => verifyDelegate(delegate)).not.throws()
		expect(() => verifyDelegate({...delegate, signedBy: generateSecret()})).throwsAsync()
	}),
})

