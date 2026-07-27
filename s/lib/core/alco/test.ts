
import {gotValue, isNay, isYay, time, txt} from "@e280/stz"
import {suite, test, expect, assert} from "@e280/science"

import {consts} from "../../../consts.js"
import {deriveId} from "../cryp/derive-id.js"
import {signDelegate} from "./sign-delegate.js"
import {signTestimony} from "./sign-testimony.js"
import {verifyDelegate} from "./verify-delegate.js"
import {verifyTestimony} from "./verify-testimony.js"
import {generateSecret} from "../cryp/generate-secret.js"
import { encrypt } from "../cryp/encrypt.js"
import { decrypt } from "../cryp/decrypt.js"

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

	"e2ee": {
		"data roundtrip": test(async() => {
			const root = generateSecret()
			const {secret} = signDelegate(root, {...basics(), petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const original = "hello world"
			const ciphertext = encrypt(secret, txt.toBytes(original))
			const cleartext = txt.fromBytes(decrypt(secret, ciphertext))
			expect(cleartext).is(original)
		}),

		"wrong key cannot decrypt": test(async() => {
			const root = generateSecret()
			const {secret} = signDelegate(root, {...basics(), petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const {secret: badSecret} = signDelegate(root, {...basics(), petition: {
				purpose: "crypt", scope: "v2", expiresAt: time.future.hours(1),
			}})
			const original = "hello world"
			const ciphertext = encrypt(secret, txt.toBytes(original))
			expect(() => decrypt(badSecret, ciphertext)).throws()
		}),

		"reproducible secret keys": test(async() => {
			const root = generateSecret()
			const delegate1 = signDelegate(root, {...basics(), petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const delegate2 = signDelegate(root, {...basics(), petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			expect(delegate1.secret).is(delegate2.secret)
		}),

		"different purposes, different keys": test(async() => {
			const root = generateSecret()
			const delegate1 = signDelegate(root, {...basics(), petition: {
				purpose: "auth", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const delegate2 = signDelegate(root, {...basics(), petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			expect(delegate1.secret).not.is(delegate2.secret)
		}),

		"different scopes, different keys": test(async() => {
			const root = generateSecret()
			const delegate1 = signDelegate(root, {...basics(), petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const delegate2 = signDelegate(root, {...basics(), petition: {
				purpose: "crypt", scope: "v2", expiresAt: time.future.hours(1),
			}})
			expect(delegate1.secret).not.is(delegate2.secret)
		}),

		"different app origins, different keys": test(async() => {
			const root = generateSecret()
			const delegate1 = signDelegate(root, {...basics(), appOrigin: "https://alpha.e280.org", petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const delegate2 = signDelegate(root, {...basics(), appOrigin: "https://bravo.e280.org", petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			expect(delegate1.secret).not.is(delegate2.secret)
		}),

		"different delegator origins, same keys": test(async() => {
			const root = generateSecret()
			const delegate1 = signDelegate(root, {...basics(), delegatorOrigin: "https://alpha.e280.org", petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const delegate2 = signDelegate(root, {...basics(), delegatorOrigin: "https://bravo.e280.org", petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			expect(delegate1.secret).is(delegate2.secret)
		}),
	},

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

