
import {gotValue, isNay, isYay, time} from "@e280/stz"
import {suite, test, expect, assert} from "@e280/science"

import {Delegate} from "./types.js"
import {deriveId} from "../cryp/derive-id.js"
import {signDelegate} from "./sign-delegate.js"
import {signTestimony} from "./sign-testimony.js"
import {verifyDelegate} from "./verify-delegate.js"
import {verifyTestimony} from "./verify-testimony.js"
import {generateSecret} from "../cryp/generate-secret.js"

const petitionerOrigin = "https://e280.org"
const delegatorOrigin = "https://authlocal.org"

const petition = () => ({
	purpose: "login",
	scope: generateSecret(),
	expiresAt: time.future.hours(1),
})

const basics = () => ({
	alias: "chase",
	delegatorOrigin,
	petitionerOrigin,
	petition: petition(),
	atTime: 0,
})

const allowed = () => ({
	atTime: 0,
	allowedDelegators: [delegatorOrigin],
	allowedPetitioners: [petitionerOrigin],
})

export default suite({
	"login flow": test(async() => {
		// authlocal keeps the user's root secret
		const root = generateSecret()
		const id = deriveId(root)

		// authlocal signs a delegate
		const delegate = signDelegate(root, basics())

		expect(delegate.identityId).is(id)
		assert(isYay(verifyDelegate(delegate, allowed())))
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

		"impersonator rejected": test(async() => {
			const goodId = deriveId(generateSecret())
			const badRoot = generateSecret()
			const delegate: Delegate = {
				...signDelegate(badRoot, basics()),
				identityId: goodId, // pretending to be signed by good guy
			}
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),

		"audience required": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				...basics(),
				petitionerOrigin: undefined as any,
			})
			assert(isNay(verifyDelegate(delegate, allowed())))
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
				petitionerOrigin: "https://bad.e280.org"
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
			const {petitionerOrigin} = basics()
			const audience = "test-server"
			const testimonyToken = signTestimony({
				secret: delegate.secret,
				atTime: 0,
				audience,
				issuer: petitionerOrigin,
				expiresAt: 1000,
				proofToken: delegate.proofToken,
				data: 123,
			})
			const testimony = verifyTestimony(testimonyToken, {
				atTime: 0,
				allowedAudiences: [audience],
				allowedIssuers: [petitionerOrigin]
			})
			assert(testimony.yay)
			assert(gotValue(testimony).data === 123)
		}),
	},
})

