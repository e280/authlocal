
import {time} from "@e280/stz"
import {suite, test, expect} from "@e280/science"

import {deriveId} from "../cryp/derive-id.js"
import {signDelegate} from "./sign-delegate.js"
import {verifyDelegate} from "./verify-delegate.js"
import {Delegate} from "./types.js"
import {generateSecret} from "../cryp/generate-secret.js"

const petitionerOrigin = "https://e280.org"
const delegatorOrigin = "https://authlocal.org"

const petition = () => ({
	scope: "login",
	expiresAt: time.future.hours(1),
})

const basics = () => ({
	alias: "chase",
	delegatorOrigin,
	petitionerOrigin,
	petition: petition(),
})

const allowed = () => ({
	allowedDelegators: [delegatorOrigin],
	allowedPetitioners: [petitionerOrigin],
})

export default suite({
	"login flow": test(async() => {
		// authlocal locally keeps the user's root secret
		const root = generateSecret()
		const id = deriveId(root)

		// authlocal signs a delegate
		const delegate = signDelegate({...basics(), secret: root})

		expect(delegate.signedBy).is(id)
		expect(() => verifyDelegate(delegate, allowed())).not.throws()
	}),

	"verify delegate": {
		"reject expired delegates": test(async() => {
			const secret = generateSecret()
			const expiresAt = 12_000
			const delegate = signDelegate({...basics(), secret, petition: {...petition(), expiresAt}})
			expect(() => verifyDelegate(delegate, {atTime: 11_000, ...allowed()})).not.throws()
			expect(() => verifyDelegate(delegate, {atTime: 13_000, ...allowed()})).throws()
			expect(() => verifyDelegate(delegate, {atTime: 12_000, ...allowed()})).throws()
		}),

		"impersonator rejected": test(async() => {
			const goodId = deriveId(generateSecret())
			const badSecret = generateSecret()
			const delegate: Delegate = {
				...signDelegate({
					...basics(),
					secret: badSecret, // actually signed by bad guy
				}),
				signedBy: goodId, // pretending to be signed by good guy
			}
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"audience required": test(async() => {
			const delegate = signDelegate({
				...basics(),
				secret: generateSecret(),
				petitionerOrigin: undefined as any,
			})
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"issuer required": test(async() => {
			const delegate = signDelegate({
				...basics(),
				secret: generateSecret(),
				delegatorOrigin: undefined as any,
			})
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"reject bad audience": test(async() => {
			const delegate = signDelegate({
				...basics(),
				secret: generateSecret(),
				petitionerOrigin: "https://bad.e280.org"
			})
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"reject bad issuer": test(async() => {
			const delegate = signDelegate({
				...basics(),
				secret: generateSecret(),
				delegatorOrigin: "https://bad.e280.org",
			})
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),
	},
})

