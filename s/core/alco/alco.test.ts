
import {time} from "@e280/stz"
import {suite, test, expect} from "@e280/science"

import {scopes} from "./scopes.js"
import {Delegate} from "./types.js"
import {deriveViceroy} from "./viceroy.js"
import {deriveId} from "../cryp/derive.js"
import {generateSecret} from "../cryp/gen.js"
import {signDelegate, verifyDelegate} from "./delegation.js"

const audience = "https://e280.org"
const issuer = "https://authlocal.org"
const allowed = {allowedIssuers: [issuer], allowedAudiences: [audience]}

export default suite({
	"login flow": test(async() => {
		// authlocal locally keeps the user's root secret
		const root = generateSecret()

		// authlocal derives a viceroy secret for each origin requesting access
		const viceroy = deriveViceroy(root, "https://e280.org")

		// authlocal signs a delegate with the viceroy
		const delegate = signDelegate(viceroy, {
			issuer,
			audience,
			scope: scopes.login,
			expiresAt: time.future.hours(1),
		})

		expect(delegate.signedBy).is(deriveId(viceroy))
		expect(() => verifyDelegate(delegate, {...allowed})).not.throws()
	}),

	"verify delegate": {
		"reject expired delegates": test(async() => {
			const secret = generateSecret()
			const expiresAt = 12_000
			const scope = scopes.login
			const delegate = signDelegate(secret, {issuer, audience, expiresAt, scope})
			expect(() => verifyDelegate(delegate, {atTime: 11_000, ...allowed})).not.throws()
			expect(() => verifyDelegate(delegate, {atTime: 13_000, ...allowed})).throws()
			expect(() => verifyDelegate(delegate, {atTime: 12_000, ...allowed})).throws()
		}),

		"impersonator rejected": test(async() => {
			const goodId = deriveId(generateSecret())
			const badSecret = generateSecret()
			const delegate: Delegate = {
				...signDelegate(badSecret, { // actually signed by bad guy
					issuer,
					audience,
					scope: scopes.login,
					expiresAt: time.future.hours(1),
				}),
				signedBy: goodId, // pretending to be signed by good guy
			}
			expect(() => verifyDelegate(delegate, {...allowed})).throws()
		}),

		"audience required": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				issuer,
				audience: undefined as any,
				scope: scopes.login,
				expiresAt: time.future.hours(1),
			})
			expect(() => verifyDelegate(delegate, {...allowed})).throws()
		}),

		"issuer required": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				issuer: undefined as any,
				audience,
				scope: scopes.login,
				expiresAt: time.future.hours(1),
			})
			expect(() => verifyDelegate(delegate, {...allowed})).throws()
		}),

		"reject bad audience": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				issuer,
				audience: "https://bad.e280.org",
				scope: scopes.login,
				expiresAt: time.future.hours(1),
			})
			expect(() => verifyDelegate(delegate, {...allowed})).throws()
		}),

		"reject bad issuer": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				issuer: "https://bad.e280.org",
				audience,
				scope: scopes.login,
				expiresAt: time.future.hours(1),
			})
			expect(() => verifyDelegate(delegate, {...allowed})).throws()
		}),
	},
})

