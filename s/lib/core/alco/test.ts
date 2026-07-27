
import {gotValue, isNay, isYay, time} from "@e280/stz"
import {suite, test, expect, assert} from "@e280/science"

import {consts} from "../../../consts.js"
import {deriveId} from "../cryp/derive-id.js"
import {signDelegate} from "./sign-delegate.js"
import {signTestimony} from "./sign-testimony.js"
import {verifyDelegate} from "./verify-delegate.js"
import {verifyTestimony} from "./verify-testimony.js"
import {generateSecret} from "../cryp/generate-secret.js"

const appOrigin = "https://e280.org"
const delegatorOrigin = "https://authlocal.org"

const petition = () => ({
	purpose: consts.purposes.auth,
	scope: generateSecret(),
	expiresAt: time.future.hours(1),
})

const basics = () => ({
	alias: "chase",
	appOrigin,
	delegatorOrigin,
	petition: petition(),
	atTime: 0,
})

const allowed = () => ({
	atTime: 0,
	allowedPurposes: Object.values(consts.purposes),
	allowedDelegators: [delegatorOrigin],
	allowedApps: [appOrigin],
})

export default suite({
	"login flow": test(async() => {
		// authlocal keeps the user's root secret
		const root = generateSecret()
		const id = deriveId(root)

		// authlocal signs a delegate
		const delegate = signDelegate(root, basics())

		assert(verifyDelegate(delegate, allowed()).yay)
		expect(gotValue(verifyDelegate(delegate, allowed())).proof.id).is(id)
		expect(gotValue(verifyDelegate(delegate, allowed())).proof.purpose).is(petition().purpose)
	}),

	"verify delegate": {
		"reject expired delegates": test(async() => {
			const root = generateSecret()
			const expiresAt = 12_000
			const delegate = signDelegate(root, {...basics(), petition: {...petition(), expiresAt}})
			assert(isYay(verifyDelegate(delegate, {...allowed(), atTime: 11_000})))
			assert(isNay(verifyDelegate(delegate, {...allowed(), atTime: 13_000})))
			assert(isNay(verifyDelegate(delegate, {...allowed(), atTime: 12_000})))
		}),

		"issuer required": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				...basics(),
				delegatorOrigin: undefined as any,
			})
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),

		"reject bad audience": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				...basics(),
				appOrigin: "https://bad.e280.org"
			})
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),

		"reject bad issuer": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				...basics(),
				delegatorOrigin: "https://bad.e280.org",
			})
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),
	},

	"testimonies": {
		"sign and verify": test(async() => {
			const root = generateSecret()
			const delegate = signDelegate(root, basics())
			const {appOrigin} = basics()
			const audience = "test-server"
			const testimonyToken = signTestimony({
				secret: delegate.secret,
				atTime: 0,
				audience,
				issuer: appOrigin,
				expiresAt: 1000,
				proofToken: delegate.proofToken,
				data: 123,
			})
			const testimony = verifyTestimony(testimonyToken, {
				atTime: 0,
				allowedAudiences: [audience],
				allowedIssuers: [appOrigin]
			})
			assert(testimony.yay)
			assert(gotValue(testimony).data === 123)
		}),
	},
})

