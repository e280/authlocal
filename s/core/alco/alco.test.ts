
import {time} from "@e280/stz"
import {suite, test, expect} from "@e280/science"

import {scopes} from "./scopes.js"
import {deriveId} from "../cryp/derive-id.js"
import {signDelegate} from "./sign-delegate.js"
import {deriveViceroy} from "./derive-viceroy.js"
import {verifyDelegate} from "./verify-delegate.js"
import {Delegate, Venue, Petition} from "./types.js"
import {generateSecret} from "../cryp/generate-secret.js"

const petition = (): Petition => ({
	scope: scopes.login,
	expiresAt: time.future.hours(1),
})

const venue = (): Venue => ({
	issuer: "https://authlocal.org",
	audience: "https://e280.org",
})

const allowed = () => ({
	allowedIssuers: [venue().issuer],
	allowedAudiences: [venue().audience],
})

export default suite({
	"login flow": test(async() => {
		// authlocal locally keeps the user's root secret
		const root = generateSecret()

		// authlocal derives a viceroy secret for each origin requesting access
		const viceroy = deriveViceroy(root, "https://e280.org")

		// authlocal signs a delegate with the viceroy
		const delegate = signDelegate(viceroy, petition(), venue())

		expect(delegate.signedBy).is(deriveId(viceroy))
		expect(() => verifyDelegate(delegate, allowed())).not.throws()
	}),

	"verify delegate": {
		"reject expired delegates": test(async() => {
			const secret = generateSecret()
			const expiresAt = 12_000
			const delegate = signDelegate(secret, {...petition(), expiresAt}, venue())
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
				petition(),
				{...venue(), audience: undefined as any},
			)
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"issuer required": test(async() => {
			const delegate = signDelegate(
				generateSecret(),
				petition(),
				{...venue(), issuer: undefined as any},
			)
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"reject bad audience": test(async() => {
			const delegate = signDelegate(
				generateSecret(),
				petition(),
				{...venue(), audience: "https://bad.e280.org"},
			)
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"reject bad issuer": test(async() => {
			const delegate = signDelegate(
				generateSecret(),
				petition(),
				{...venue(), issuer: "https://bad.e280.org"},
			)
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),
	},
})

