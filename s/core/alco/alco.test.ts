
import {time} from "@e280/stz"
import {suite, test, expect} from "@e280/science"

import {purposes} from "./purposes.js"
import {deriveViceroy} from "./derive.js"
import {generateSecret} from "../cryp/kit.js"
import {signDelegate, verifyDelegate} from "./delegation.js"

export default suite({
	"login flow": test(async() => {
		const root = generateSecret()
		const viceroy = await deriveViceroy(root, "https://e280.org")
		const delegate = await signDelegate(viceroy, {
			purpose: purposes.id,
			expiresAt: time.future.hours(1),
		})
		expect(delegate.signedBy).ok()
		await expect(async() => verifyDelegate(delegate)).not.throwsAsync()
		await expect(async() => verifyDelegate({...delegate, signedBy: generateSecret()})).throwsAsync()
	}),
})

