
import {time} from "@e280/stz"
import {suite, test, expect} from "@e280/science"

import {deriveId} from "../cryp/derive-id.js"
import {signDelegate} from "./sign-delegate.js"
import {verifyDelegate} from "./verify-delegate.js"
import {Delegate, Venue, Petition} from "./types.js"
import {generateSecret} from "../cryp/generate-secret.js"

const petition = (): Petition => ({
	scope: "login",
	expiresAt: time.future.hours(1),
})

const venue = (): Venue => ({
	petitionerOrigin: "https://e280.org",
	delegatorOrigin: "https://authlocal.org",
})

const allowed = () => ({
	allowedDelegators: [venue().delegatorOrigin],
	allowedPetitioners: [venue().petitionerOrigin],
})

export default suite({
	"login flow": test(async() => {
		// authlocal locally keeps the user's root secret
		const root = generateSecret()
		const id = deriveId(root)

		// authlocal signs a delegate
		const delegate = signDelegate(root, "chase", petition(), venue())

		expect(delegate.signedBy).is(id)
		expect(() => verifyDelegate(delegate, allowed())).not.throws()
	}),

	"verify delegate": {
		"reject expired delegates": test(async() => {
			const secret = generateSecret()
			const expiresAt = 12_000
			const delegate = signDelegate(secret, "chase", {...petition(), expiresAt}, venue())
			expect(() => verifyDelegate(delegate, {atTime: 11_000, ...allowed()})).not.throws()
			expect(() => verifyDelegate(delegate, {atTime: 13_000, ...allowed()})).throws()
			expect(() => verifyDelegate(delegate, {atTime: 12_000, ...allowed()})).throws()
		}),

		"impersonator rejected": test(async() => {
			const goodId = deriveId(generateSecret())
			const badSecret = generateSecret()
			const delegate: Delegate = {
				...signDelegate(
					badSecret, // actually signed by bad guy
					"chase",
					petition(),
					venue(),
				),
				signedBy: goodId, // pretending to be signed by good guy
			}
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"audience required": test(async() => {
			const delegate = signDelegate(
				generateSecret(),
				"chase",
				petition(),
				{...venue(), petitionerOrigin: undefined as any},
			)
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"issuer required": test(async() => {
			const delegate = signDelegate(
				generateSecret(),
				"chase",
				petition(),
				{...venue(), delegatorOrigin: undefined as any},
			)
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"reject bad audience": test(async() => {
			const delegate = signDelegate(
				generateSecret(),
				"chase",
				petition(),
				{...venue(), petitionerOrigin: "https://bad.e280.org"},
			)
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"reject bad issuer": test(async() => {
			const delegate = signDelegate(
				generateSecret(),
				"chase",
				petition(),
				{...venue(), delegatorOrigin: "https://bad.e280.org"},
			)
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),
	},
})

