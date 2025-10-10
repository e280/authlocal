
import {Science, test, expect} from "@e280/science"

import identityTest from "./core/identity/identity.test.js"

import {Login} from "./core/session/login.js"
import {verifyClaim} from "./core/claim/verify.js"
import {generateSession} from "./core/session/session.js"
import {generateIdentity} from "./core/identity/identity.js"

const expiresAt = Date.now() + 999_000
const appOrigin = "https://example.e280.org"
const authorityOrigin = "https://authlocal.org"

async function setupLogin() {
	const identity = await generateIdentity()
	const session = await generateSession({identity, expiresAt, appOrigin, authorityOrigin})
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

	identity: identityTest,
})

