
import {isNay, isYay, time} from "@e280/stz"
import {suite, test, expect, assert} from "@e280/science"

import {Delegate} from "./types.js"
import {deriveId} from "../cryp/derive-id.js"
import {signDelegate} from "./sign-delegate.js"
import {verifyDelegate} from "./verify-delegate.js"
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
		const delegate = signDelegate({...basics(), root})

		expect(delegate.signedBy).is(id)
		assert(isYay(verifyDelegate(delegate, allowed())))
	}),

	"verify delegate": {
		"reject expired delegates": test(async() => {
			const root = generateSecret()
			const expiresAt = 12_000
			const delegate = signDelegate({...basics(), root, petition: {...petition(), expiresAt}})
			assert(isYay(verifyDelegate(delegate, {...allowed(), atTime: 11_000})))
			assert(isNay(verifyDelegate(delegate, {...allowed(), atTime: 13_000})))
			assert(isNay(verifyDelegate(delegate, {...allowed(), atTime: 12_000})))
		}),

		"impersonator rejected": test(async() => {
			const goodId = deriveId(generateSecret())
			const badRoot = generateSecret()
			const delegate: Delegate = {
				...signDelegate({
					...basics(),
					root: badRoot, // actually signed by bad guy
				}),
				signedBy: goodId, // pretending to be signed by good guy
			}
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),

		"audience required": test(async() => {
			const delegate = signDelegate({
				...basics(),
				root: generateSecret(),
				petitionerOrigin: undefined as any,
			})
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),

		"issuer required": test(async() => {
			const delegate = signDelegate({
				...basics(),
				root: generateSecret(),
				delegatorOrigin: undefined as any,
			})
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),

		"reject bad audience": test(async() => {
			const delegate = signDelegate({
				...basics(),
				root: generateSecret(),
				petitionerOrigin: "https://bad.e280.org"
			})
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),

		"reject bad issuer": test(async() => {
			const delegate = signDelegate({
				...basics(),
				root: generateSecret(),
				delegatorOrigin: "https://bad.e280.org",
			})
			assert(isNay(verifyDelegate(delegate, allowed())))
		}),
	},
})

