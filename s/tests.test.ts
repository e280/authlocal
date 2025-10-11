
import {txt} from "@e280/stz"
import {Science, test, expect} from "@e280/science"

import identityTest from "./core/identity/identity.test.js"

import {Login} from "./core/session/login.js"
import {verifyClaim} from "./core/claim/verify.js"
import {defaultContext} from "./core/crypto/crypto.js"
import {generateSession} from "./core/session/session.js"
import {generateIdentity} from "./core/identity/identity.js"

const expiresAt = Date.now() + 999_000
const appOrigin = "https://example.e280.org"
const authorityOrigin = "https://authlocal.org"

async function setupLogin() {
	const identity = await generateIdentity()
	const session = await generateSession({
		identity,
		expiresAt,
		appOrigin,
		authorityOrigin,
		context: defaultContext,
	})
	const login = await Login.verify({session, appOrigins: [appOrigin]})
	expect(login.nametag.id).is(identity.id)
	expect(login.session.secret).is(session.secret)
	return login
}

await Science.run({
	"login": test(async() => {
		await setupLogin()
	}),

	"claims": Science.suite({
		"sign/verify": test(async() => {
			const login = await setupLogin()
			const claimToken = await login.signClaim({
				claim: "hello",
				expiresAt,
			})
			const {claim, proof} = await verifyClaim<string>({claimToken, appOrigins: [appOrigin]})
			expect(proof.nametag.id).is(login.nametag.id)
			expect(claim).is("hello")
		}),
	}),

	"login symkey cryption": test(async() => {
		const login = await setupLogin()
		const exampleString = "d1e3b4036bab8e94ed4e9703ffe60ad13c27050aa6b552188e79f1331ada7a69"
		const exampleBytes = txt.toBytes(exampleString)
		const encrypted = await login.encrypt(exampleBytes)
		const decrypted = await login.decrypt(encrypted)
		const decryptedString = txt.fromBytes(decrypted)
		expect(decryptedString).is(exampleString)
	}),

	identity: identityTest,
})

