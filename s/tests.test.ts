
import {Science, test, expect} from "@e280/science"
import {Login} from "./core/login.js"
import {generateIdentity} from "./core/identity.js"
import {generateSession, signClaim, verifyClaim} from "./core/session.js"

import identityTest from "./core/identity.test.js"

const expiresAt = Date.now() + 999_000

async function setupLogin() {
	const identity = await generateIdentity()
	const session = await generateSession(identity, {expiresAt})
	const login = await Login.verify(session)
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
			const claimToken = await signClaim<string>(
				login.session,
				"hello",
				{expiresAt},
			)
			const {claim, proof} = await verifyClaim<string>(claimToken)
			expect(proof.nametag.id).is(login.nametag.id)
			expect(claim).is("hello")
		}),
	}),

	identity: identityTest,
})

