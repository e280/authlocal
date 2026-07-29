
import {time, txt} from "@e280/stz"
import {suite, test, expect} from "@e280/science"

import {consts} from "../../../consts.js"
import {encrypt} from "../cryp/encrypt.js"
import {decrypt} from "../cryp/decrypt.js"
import {deriveId} from "../cryp/derive-id.js"
import {signDelegate} from "./delegate/sign.js"
import {signTestimony} from "./testimony/sign.js"
import {verifyDelegate} from "./delegate/verify.js"
import {verifyTestimony} from "./testimony/verify.js"
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
	audience: appOrigin,
	issuer: delegatorOrigin,
	petition: petition(),
	atTime: 0,
})

const allowed = () => ({
	atTime: 0,
	allowedPurposes: Object.values(consts.purposes),
	allowedIssuers: [delegatorOrigin],
	allowedAudiences: [appOrigin],
})

export default suite({
	"login flow": test(async() => {
		// authlocal keeps the user's root secret
		const root = generateSecret()
		const id = deriveId(root)

		// authlocal signs a delegate
		const delegate = signDelegate(root, basics())

		expect(() => verifyDelegate(delegate, allowed())).not.throws()
		expect(verifyDelegate(delegate, allowed()).proof.id).is(id)
		expect(verifyDelegate(delegate, allowed()).proof.purpose).is(petition().purpose)
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

		"bad ciphertext version": test(async() => {
			const secret = generateSecret()
			const original = "hello world"
			const ciphertext = encrypt(secret, txt.toBytes(original))
			ciphertext.set(new Uint8Array([255]), 0)
			expect(() => decrypt(secret, ciphertext)).throws()
		}),

		"aad": test(async() => {
			const secret = generateSecret()
			const original = "hello world"
			const aad = new Uint8Array([0xB0, 0x0B, 0x13])
			const ciphertext = encrypt(secret, txt.toBytes(original), aad)
			const cleartext = txt(decrypt(secret, ciphertext, aad))
			expect(cleartext).is(original)
		}),

		"bad aad": test(async() => {
			const secret = generateSecret()
			const original = "hello world"
			const aad = new Uint8Array([0xB0, 0x0B, 0x13])
			const bad = new Uint8Array([0xB0, 0x0B, 0x00])
			const ciphertext = encrypt(secret, txt.toBytes(original), aad)
			expect(() => decrypt(secret, ciphertext, bad)).throws()
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
			const delegate1 = signDelegate(root, {...basics(), audience: "https://alpha.e280.org", petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const delegate2 = signDelegate(root, {...basics(), audience: "https://bravo.e280.org", petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			expect(delegate1.secret).not.is(delegate2.secret)
		}),

		"different delegator origins, same keys": test(async() => {
			const root = generateSecret()
			const delegate1 = signDelegate(root, {...basics(), issuer: "https://alpha.e280.org", petition: {
				purpose: "crypt", scope: "v1", expiresAt: time.future.hours(1),
			}})
			const delegate2 = signDelegate(root, {...basics(), issuer: "https://bravo.e280.org", petition: {
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
			expect(() => verifyDelegate(delegate, {...allowed(), atTime: 11_000})).not.throws()
			expect(() => verifyDelegate(delegate, {...allowed(), atTime: 13_000})).throws()
			expect(() => verifyDelegate(delegate, {...allowed(), atTime: 12_000})).throws()
		}),

		"issuer required": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				...basics(),
				issuer: undefined as any,
			})
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"reject bad audience": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				...basics(),
				audience: "https://bad.e280.org"
			})
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),

		"reject bad issuer": test(async() => {
			const delegate = signDelegate(generateSecret(), {
				...basics(),
				issuer: "https://bad.e280.org",
			})
			expect(() => verifyDelegate(delegate, allowed())).throws()
		}),
	},

	"testimonies": {
		"sign and verify": test(async() => {
			const root = generateSecret()
			const delegate = signDelegate(root, basics())
			const audience = "test-server"
			const testimonyToken = signTestimony(delegate, 123, {
				audience,
				atTime: 0,
				expiresAt: 1000,
			})
			const testimony = verifyTestimony<number>(testimonyToken, {
				atTime: 0,
				allowedAudiences: [audience],
				allowedIssuers: [appOrigin]
			})
			expect(testimony.data).is(123)
		}),
	},
})

